import { HttpResponse, HttpRequest, Controller, EmailValidator } from "../protocols"
import { badRequest, serverError } from "../helpers/http-helper"
import { MissingParamError, InvalidParamError } from "../errors"

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (httpRequest.body.password !== httpRequest.body.password_confirmation) {
        return badRequest(new InvalidParamError("password_confirmation"))
      }
      return {
        statusCode: 200,
        body: "Success"
      }
    } catch (err) {
      return serverError()
    }
  }
}
