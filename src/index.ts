import "express-async-errors"
import AppWrapper from "./app/AppWrapper"
import { HttpServer } from "./app/server/HttpServer"
import BaseController from "./controllers/baseController/BaseController"
import errorHandlerMiddleware from "./middlewares/error"

// Controllers region
import FixerController from "./controllers/fixer"
import AppSettings from "./app/AppSettings"
import ExampleController from "./controllers/example"
// End controllers

const controllers: BaseController[] = [FixerController, ExampleController]

const appWrapper = new AppWrapper(controllers)
const server = new HttpServer(appWrapper, AppSettings)
server.start()

process.on("uncaughtException", (error: NodeJS.UncaughtExceptionListener) => {
  errorHandlerMiddleware.manageNodeException(error)
})

process.on("unhandledRejection", (reason: NodeJS.UncaughtExceptionListener) => {
  errorHandlerMiddleware.manageNodeException(reason)
})

