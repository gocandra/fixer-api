
import { Result } from "result-tsk"
import BaseController, { Request, Response, NextFunction } from "../baseController/BaseController"

export class ExampleController extends BaseController {
  constructor() {
    super()
    this.initializeRoutes()
  }


  echo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = req.params.name
      const pong = new Result()
      pong.setMessage(`funciona el deploy ${name}! <3`, "200")
      this.handleResult(res, pong)
    } catch (error) {
      next(error)
    }
  }

  name = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.log.debug(req.params)
      const pong = new Result()
      this.log.info(`Hola soy ${process.env.K_SERVICE}`)
      this.log.warn(`Hola soy un warn en ${process.env.K_SERVICE}`)
      this.log.error(`Hola soy un error en ${process.env.K_SERVICE}`)
      pong.setMessage(`Hola soy ${process.env.K_SERVICE}`, "200")
      this.handleResult(res, pong)
    } catch (error) {
      next(error)
    }
  }

  private initializeRoutes(): void {
    this.router.get("/ping", this.name)
    this.router.post("/name/:name", this.echo)
  }
}

export default new ExampleController()

