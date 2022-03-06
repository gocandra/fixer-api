import * as winston from "winston"

const loggerFormat = winston.format((info) => ({
  ...info
}))


const customLevels = {
  levels: {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  },
}

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  loggerFormat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info

    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`
  }),
)

interface IWinstonLogger {
  debug(msg: any, meta: any): void
  info(msg: any, meta: any): void
  warn(msg: any, meta: any): void
  error(msg: any, meta: any): void
  log(level: any, msg: any, meta: any): void
}

export interface ILogger {
  debug(msg: any, meta?: any): void
  info(msg: any, meta?: any): void
  warn(msg: any, meta?: any): void
  error(msg: any, meta?: any): void
  fatal(msg: any, meta?: any): void
}

class Logger {
  private logger: IWinstonLogger;

  constructor() {
		
    
    // Create a Winston logger that streams to Stackdriver Logging
    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    this.logger = winston.createLogger({
      
      level: "info" ,
      levels: customLevels.levels,
      format: formatter,
      transports: new winston.transports.Console(),
    })

    winston.addColors(customLevels.colors)
		
  }

  debug(msg: any, meta?: any): void {
    this.logger.debug(msg, meta)
  }

  info(msg: any, meta?: any): void {
    this.logger.info(msg, meta)
  }

  warn(msg: any, meta?: any): void {
    this.logger.warn(msg, meta)
  }

  error(msg: any, meta?: any): void {
    this.logger.error(msg, meta)
  }

  fatal(msg: any, meta?: any): void {
    this.logger.log("fatal", msg, meta)
  }
}

export default new Logger()