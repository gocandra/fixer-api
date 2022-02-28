import * as Mongoose from "mongoose";

let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = process.env.MONGO_DB_URL;
  if (database) {
    return;
  }
  Mongoose.connect(uri, {
   /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
	 bufferCommands: false,
	 /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
	 dbName: 'fixer-example',
	 /** Set to false to disable automatic index creation for all models associated with this connection. */
	 autoIndex: true,
	 /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
	 autoCreate: true
  });
	
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to mongo database");
  });
  database.on("error", () => {
    console.log("Error connecting to mongo database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};