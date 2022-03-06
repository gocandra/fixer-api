import axios from 'axios'
import { IRate } from '../../wouldBeModules/mongodb-module/rates/IRate'

class RatesFixerProvider {
  accessKey: string
  constructor() {
    this.accessKey = process.env.FIXER_ACCESS_KEY as string
  }

  async getLatestRates(): Promise<IRate> {
    try {
      const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${this.accessKey}`)
			if(!response.data.success) throw response.data
      return response.data
    } catch (err) {
      throw {message: 'Failed to get rates from fixer', err: err}
    }
  }
}

export default new RatesFixerProvider()