import { IRate } from "../../wouldBeModules/mongodb-module/rates/IRate"

export interface IRateProvider {
	getLatestRates(): Promise<IRate>
}