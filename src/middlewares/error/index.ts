import { HttpStatusResolver } from "../../shared/httpResponse/HttpStatusResolver"
import { ApplicationError } from "../../shared/errors/ApplicationError"
import { Request, Response, NextFunction } from "../../app/core/Modules"
import resources from "../../shared/locals/messages"
import { Result } from "result-tsk"
import config from "../../app/config"
import logger from "../../shared/logger"

export class ErrorHandlerMiddleware {
  handle(err: ApplicationError, req: Request, res: Response, next: NextFunction): void {
    if(req) logger.info("object")
    const result = new Result()
    if (err?.name === "ApplicationError") {
      logger.info("Controlled application error:", err.message)
      result.setError(err.message, err.errorCode)
    } else {
      // Send to your log this error
      logger.info("No controlled application error:", err)
      result.setError(
        resources.get(config.params.defaultApplicationError.Message),
        config.params.defaultApplicationError.Code,
      )
    }
    if (res.headersSent) {
      return next(result)
    }
    res.status(HttpStatusResolver.getCode(result.statusCode.toString())).send(result)
  }

  manageNodeException(exc: NodeJS.UncaughtExceptionListener): void {
    logger.info("Node exception:", exc)
  }
}

export default new ErrorHandlerMiddleware()
