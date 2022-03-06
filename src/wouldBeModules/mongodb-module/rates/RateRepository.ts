import mongoose from 'mongoose'
import { RepositoriesError } from "../../../shared/errors/RepositoriesError"
import { IRate } from "./IRate"
import { IRateRepository } from "./IRateRepository"
import { RateSchema } from "./RateSchema"


class RateRepository implements IRateRepository {
  Rate: any
  constructor() {
    this.Rate = mongoose.model('Rate', RateSchema)
  }

  async create(uid: string, data: IRate): Promise<boolean> {
    try {
      data['_id'] = uid
      const rate = new this.Rate({ ...data })
      await rate.save()
      return true
    } catch (err) {
      throw new RepositoriesError('failed to create rate', err)
    }
  }

  async find(uid: string): Promise<IRate | boolean> {
    try {
      const rate = this.Rate.findById(uid)
      if (!rate) return false
      else return rate
    } catch (err) {
      throw new RepositoriesError('failed to create rate', err)
    }
  }

  async update(uid: string, data: IRate): Promise<IRate> {
		try {
			const filter = { _id: uid }
			await this.Rate.findOneAndUpdate(filter, data, { upsert: true, new: true, setDefaultsOnInsert: true })
			return await this.Rate.findOne(filter)
		} catch (err) {
			throw new RepositoriesError('failed to update rate', err)
		}
  }
}

export default new RateRepository()