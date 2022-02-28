import { Request as ServerRequest } from "express"

export interface IRequest extends ServerRequest {
  session: string;
}
