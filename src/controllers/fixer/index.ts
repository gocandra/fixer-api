import BaseController, { Request, Response, NextFunction } from "../baseController/BaseController"
import { CreateRateUseCase } from "./container"

export class RateController extends BaseController {
  constructor() {
    super()
    this.initializeRoutes()
  }


  createRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
			this.log.debug('ingreso a create Rate')
      this.handleResult(res, await CreateRateUseCase.execute())
    } catch (error) {
      next(error)
    }
  }


  private initializeRoutes(): void {
    this.router.post("", this.createRate)
  }
}

export default new RateController()

