import { Schema } from "mongoose"
import { IRate } from "./IRate"

export const RateSchema = new Schema<IRate>({
  _id: { type: String, required: true },
  base: { type: String, required: true },
  date: { type: String, required: true },
  rates: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Number, required: true }
})
