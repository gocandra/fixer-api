import { BaseUseCase, IResultT, IResultT } from "../base/BaseUseCase"
import { IRateRepository } from "../../../wouldBeModules/repositories-module"

export class CreateRateUseCase extends BaseUseCase {
  constructor(
		private readonly RateRepository: IRateRepository,
		private readonly RateProvider: IRateProvider
		 ) {
    super()
  }
  async execute(
		date: Date,

	): Promise<IResultT<>> {
			const result = new Result()
			
    } catch (err) {
      result.setError(err, this.applicationStatus.INTERNAL_ERROR)
      return result
    }
  }
}
