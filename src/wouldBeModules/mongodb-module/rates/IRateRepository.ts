import { IRate } from "./IRate"

export interface IRateRepository {
	create(id: string, data:IRate): Promise<boolean>
	find(id: string): Promise<IRate | boolean>
	update(id: string, data: IRate): Promise<IRate>
}
