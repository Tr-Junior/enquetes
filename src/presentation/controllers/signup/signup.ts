import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from "./signup-protocols"
import { badRequest, ok, serverError } from "../../helpers/http-helper"
import { MissingParamError, InvalidParamError } from "../../errors"

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, password_confirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== password_confirmation) {
        return badRequest(new InvalidParamError("password_confirmation"))
      }
      const account = this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (err) {
      return serverError()
    }
  }
}
