"use strict"
import BaseController from "../controllers/baseController/BaseController"
import AppSettings from "./AppSettings"
import { BodyParser } from "./core/Modules"
import { Application } from "./core/ServerModules"
import * as ServerApp from "express"
import config from "./config"
import errorHandlerMiddleware from "../middlewares/error"
import logger  from "../shared/logger"
import { connect } from "../wouldBeModules/mongodb-module/connection"

export default class AppWrapper {
  app: Application
  repos: boolean
  constructor(controllers: BaseController[]) {
    this.repos = false
    this.setup()
    this.app = ServerApp()
    this.app.set("trust proxy", true)
    this.loadMiddleware()
    this.loadControllers(controllers)
    this.loadErrorHandler()
  }

  private loadMiddleware(): void {
    this.app.use(BodyParser())
  }

  private loadControllers(controllers: BaseController[]): void {
    controllers.forEach((controller) => {
      this.app.use(AppSettings.ServerRoot, controller.router)
    })
  }

  private loadErrorHandler(): void {
    this.app.use(errorHandlerMiddleware.handle)
  }

  private setup(): void {
    logger.info("ejecuta el init")
    AppSettings.init(config)
  }

  async initializeServices(): Promise<boolean> {
    if (!this.repos) {
      this.repos = await connect()
      logger.info("Initialized Repositories", this.repos)
    }
    // Initialize db and other services here and once started run server start
    // reject if any error with db or other service
    return true
  }
}

