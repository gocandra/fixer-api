import axios from 'axios'
class RatesFixerProvider {
	accessKey: string
	constructor() {
		this.accessKey = process.env.FIXER_ACCESS_KEY
	}

	async getLatestRates(): Promise<any>{
		try {
			const response = await axios.get(`http://data.fixer.io/api/latest?access_key={this.accessKey}&base=USD`)
			return response.data
		} catch (err) {
			
		}
	}
}

export default new RatesFixerProvider()