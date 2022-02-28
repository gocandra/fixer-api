export { Request, Response, NextFunction } from "../../app/core/Modules"
import { Router, Response, RouterType } from "../../app/core/Modules"
import { HttpStatusResolver } from "../../shared/httpResponse/HttpStatusResolver"
import { IResult } from "result-tsk"
import validator from "../../middlewares/validator"
import logger, { ILogger } from "../../shared/logger"

export default class BaseController {
  router: RouterType;
  validate: unknown
  log: ILogger
  constructor() {
    this.router = Router()
    this.validate = validator.validate
    this.log = logger
  }

  handleResult(res: Response, result: IResult): void {
    if (!result.success) {
      res.status(HttpStatusResolver.getCode(`${result.statusCode}`))
        .json(result.error ? result.toResultDto() : result.toResultDto().data)
    } else {
      res.status(HttpStatusResolver.getCode(`${result.statusCode}`))
        .json(result.message ? result.toResultDto() : result.toResultDto().data)
    }
  }
}