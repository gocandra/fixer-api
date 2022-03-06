import { BaseUseCase, ResultT, IResultT } from "../base/BaseUseCase"
import { IRateProvider } from "../../../providers/rates/IRateProvider"
import { currencies } from "../../types/rates"
import { IRateRepository, IRate } from "../../../wouldBeModules/mongodb-module/rates"
import { calculateCrossCurrencyRates, calculateFee } from "./utils/rates"

export interface GetRateResponseT {
  pair: [currencies, currencies]
  originalRate: number
  Fee: number
  feeAmount: number
  RateWithMarkUp: number
}

export class GetRateUseCase extends BaseUseCase {
  constructor(
    private readonly RateRepository: IRateRepository,
    private readonly RateProvider: IRateProvider
  ) {
    super()
  }

	async updateRates(): Promise<IRate> {
		try {
			const ratesResponse = await this.RateProvider.getLatestRates()
			const doc = await this.RateRepository.update('latestRates', ratesResponse)
			return doc
		} catch (err) {
			throw `failed to update Rates error: ${err}`
		}
	}

  async execute(
    from: currencies,
    to: currencies,
    fee: number
  ): Promise<IResultT<GetRateResponseT>> {
    const result = new ResultT<GetRateResponseT>()
		const currTime = Math.round(new Date().getTime() / 1000)
    try {
      let rates: Record<currencies, number>
			this.log.info('entro al caso de uso')
      const ratesDocument = await this.RateRepository.find('latestRates')
      if (!ratesDocument || typeof (ratesDocument) == 'boolean') {
				this.log.info('si entra aca es porque el documento no existe en la db')
        const ratesResponse = await this.updateRates()
        rates = ratesResponse.rates
      } else {
				this.log.info('si entra aca es porque existe el documento en la db')
				if((currTime - ratesDocument.timestamp) > 60*60*1000) {
					this.log.info('paso mas de una hora desde el ultimo update de rates, actualizamos')
					const ratesResponse = await this.updateRates()
					rates = ratesResponse.rates
				} else {
					this.log.info('no paso mas de una hora desde el ultimo update de rates')
					rates = ratesDocument.rates
				}
			}
      const originalRate = calculateCrossCurrencyRates(rates[from], rates[to])
			this.log.info(`calculamos el exchange rate => ${originalRate}`)
      const feeAmount = calculateFee(fee, originalRate)
			this.log.info(`calculamos el fee sobre el exchange rate => ${feeAmount}`)
      result.setData({
        pair: [from, to],
        originalRate: originalRate,
        Fee: fee,
        feeAmount: feeAmount,
        RateWithMarkUp: feeAmount + originalRate
      }, this.applicationStatus.SUCCESS)
      return result
    } catch (err) {
			this.log.error(err)
      result.setError(err, this.applicationStatus.INTERNAL_ERROR)
      return result
    }
  }
}

1646582822 
1646585610187
1646585780953