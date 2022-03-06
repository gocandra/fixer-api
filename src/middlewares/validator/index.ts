/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv, { Schema } from "ajv"
import { ValidationError } from "../../shared/errors/ValidationError"

/**
 * Express middleware for validating requests
 *
 * @class Validator
 */
class Validator {
  ajv: any
  constructor(ajvOptions: Record<string, any>) {
    this.ajv = new Ajv(ajvOptions)
    this.validate = this.validate.bind(this)
  }

  /**
   * Validator method to be used as middleware
   *
   * @param {Object} params Options in format { "request_property": schema }
   * @returns
   */

  validate(schema: Schema, values: Record<string, any>) {
    // const reqProps: string[] = Object.keys(schema)
    // const request = values
    // const bodyKeys: string[] = Object.keys(values)

    /* Define variables for AJV */
    const validationErrors: Record<string, any> = {}

    /* Iterate through every property of the body we want to validate */
    // for (const property of reqProps) {
    // 	let reqProp
    // 	if (property == "body") {
    // 		reqProp = request
    // 	} else {
    // 		reqProp = request[property]
    // 	}
    // 	const reqSchema = schema[property]
    /* Create validation function */
    const validateFunction = this.ajv.compile(schema)
    const isValid = validateFunction(values)
    /* Add errors to error object */
    if (!isValid) {
      validationErrors["error"] = validateFunction.errors
      throw new ValidationError(validationErrors)
    }

    return true
  }
}
export default new Validator({ allErrors: true, allowUnionTypes: true })
