import { GetRateUseCase } from "../../../domain/useCases/rates"
import RatesFixer from "../../../providers/rates/RatesFixer"
import { RateRepository } from "../../../wouldBeModules/mongodb-module/rates/"

const GetRate = new GetRateUseCase(RateRepository, RatesFixer)

export { 
  GetRate
}