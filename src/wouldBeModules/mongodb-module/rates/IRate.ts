import { currencies } from "../../../domain/types/rates"

export interface IRate {
	_id: string
	base: string
	date: string
	rates: Record<currencies, number>
	timestamp: number
}
