/**
 * Validation Error
 *
 * @class ValidationError
 * @extends {Error}
 */
export class ValidationError extends Error {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(validationErrors: Record<string, any> | string) { 
    super()
    this.name = "ValidationError"
    let messages = ""
    if(typeof(validationErrors) == "string") {
      messages = validationErrors
    } else {
      for(const key in validationErrors) {
        for(let i = 0; i < validationErrors[key].length; i++) {
          /* Format error nicely */
          let message = `${key} in ${validationErrors[key][i].instancePath} error => ${validationErrors[key][i].message}`
          if(validationErrors[key][i].params.allowedValues) {
            message =  `${message} allowed values are ${validationErrors[key][i].params.allowedValues.join(" or ")} \n`
          }
          if(validationErrors[key][i].params.additionalProperty) {
            message =  `${message} allowed values are ${validationErrors[key][i].params.additionalProperty} \n`
          }
          messages = messages + message
        }
      }
    }
    this.message = messages
    /* The stack holds all the validation errors */
  }
}
