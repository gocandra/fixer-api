import * as Mongoose from "mongoose"
import logger from "../../shared/logger"

let database: Mongoose.Connection
export const connect = (): boolean => {
  // add your own uri below
  const uri = process.env.MONGO_DB_URL as string
  if (database) {
    return true
  } else {
    Mongoose.connect(uri, {
      /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
      bufferCommands: false,
      /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
      dbName: 'fixer-example',
      /** Set to false to disable automatic index creation for all models associated with this connection. */
      autoIndex: true,
      /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
      autoCreate: true
    })

    database = Mongoose.connection
    database.once("open", async () => {
      logger.info("Connected to mongo database")
      return true
    })
    database.on("error", () => {
      logger.error("Error connecting to mongo database")
      return false
    })
  }
  return true
}
export const disconnect = () => {
  try {    
    if (!database) {
      return true
    }
    Mongoose.disconnect()
    return true
  } catch (error) {
    logger.error(error)
    throw('failed to disconnect')
  }
}