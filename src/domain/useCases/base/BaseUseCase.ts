import logger, { ILogger } from "../../../shared/logger"
export { IResult, Result, IResultT, ResultT } from "result-tsk"


export class BaseUseCase {
  constructor() {
    this.log = logger
  }
  log: ILogger
  applicationStatus = {
    SUCCESS: "200",
    CREATED: "201",
    NOT_CONTENT: "204",
    INVALID_INPUT: "400",
    UNAUTHORIZED: "401",
    NOT_FOUND: "404",
    INTERNAL_ERROR: "500",
  }
	
}
