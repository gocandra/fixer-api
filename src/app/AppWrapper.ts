"use strict"
import BaseController from "../controllers/baseController/BaseController"
import AppSettings from "./AppSettings"
import { ServerApp, Application, BodyParser } from "./core/Modules"
import config from "./config"
import errorHandlerMiddleware from "../middlewares/error"
import { logger } from "../services/logging"
import { instantiateRepositories } from "../../../../modules/repositories-module/dist/src/index"

export default class AppWrapper {
  app: Application
  repos: boolean
  constructor(controllers: BaseController[]) {
    logger.info("test on your terminal wuth => curl --location --request GET 'localHost:8080/ping'")
    logger.info("replace :name with your name! =)")
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
    try {
      if (!this.repos) {
        logger.debug(AppSettings.projectId)
        logger.debug(AppSettings.serviceName)
        this.repos = await instantiateRepositories(AppSettings.projectId, "AppSettings.serviceName")
        logger.info("Initialized Repositories", this.repos)
      }
      // Initialize db and other services here and once started run server start
      // reject if any error with db or other service
      return true
    } catch (err) {
      logger.error(err)
      return true
    }
  }
}

