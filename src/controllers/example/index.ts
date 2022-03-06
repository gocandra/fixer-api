
import { Result } from "result-tsk"
import BaseController, { Request, Response, NextFunction } from "../baseController/BaseController"

class ExampleController extends BaseController {
  constructor() {
    super()
    this.initializeRoutes()
  }

  echo = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
			this.log.info(`Hola soy ${process.env.K_SERVICE}`)
      this.log.warn(`Hola soy un warn en ${process.env.K_SERVICE}`)
      this.log.error(`Hola soy un error en ${process.env.K_SERVICE}`)
      const pong = new Result()
      pong.setMessage(`funciona el server <3`, "200")
      this.handleResult(res, pong)
    } catch (err) {
			this.log.fatal('Fallo el echo!')
			this.log.error(err)
      next(err)
    }
  }

  private initializeRoutes(): void {
    this.router.get("/ping", this.echo)
  }
}

export default new ExampleController()

