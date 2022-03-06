import { ApplicationError } from "../../shared/errors/ApplicationError"
import { currencies, currenciesArray } from "../../domain/types/rates"
import BaseController, { Request, Response, NextFunction } from "../baseController/BaseController"
import { GetRate } from "./container"

export class RateController extends BaseController {
  constructor() {
    super()
    this.initializeRoutes()
  }


  getRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.log.debug('ingreso a create Rate')
      const fee = parseInt(req.params.fee)
			const from = req.params.from as currencies
			const to = req.params.to as currencies
      if(isNaN(fee)) throw new ApplicationError(`fee should be a number`, 400)
			if(fee > 100 && fee <= 0) throw  new ApplicationError(`fee should be a number in range (0 and 100]`, 400)
			if(!currenciesArray.includes(from) || !currenciesArray.includes(to)) throw  new ApplicationError(`from and to should correspond to any value in ${currenciesArray}`, 400)
      this.handleResult(res, await GetRate.execute(
        from,
				to,
        fee
      ))
    } catch (err) {
			this.log.error(err)
      next(err)
    }
  }

  private initializeRoutes(): void {
    this.router.get("/rates/conversion/:from/:to/:fee", this.getRate)
	}
}

export default new RateController()

