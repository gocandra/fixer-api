import { Server, createServer } from "http"
import AppWrapper from "../AppWrapper"
import { IAppSettings } from "../AppSettings"
import logger from "../../shared/logger"

export class HttpServer {
  #appWrapper: AppWrapper;
  appSettings: IAppSettings
  server: Server;

  constructor(appWrapper: AppWrapper, appSettings: IAppSettings) {
    this.#appWrapper = appWrapper
    this.server = createServer(this.#appWrapper.app)
    this.appSettings = appSettings
  }

  start(): void {
    this.#appWrapper
      .initializeServices()
      .then(() => {
        this.server.listen(this.appSettings.ServerPort)
      })
      .catch((error) => {
        logger.info("Server error", error)
      })

    this.server.on("listening", () => {
      logger.info(
        `Server running on ${this.appSettings.ServerPort}${this.appSettings.ServerRoot}`,
      )
      // eslint-disable-next-line no-console
    })
  }
}
