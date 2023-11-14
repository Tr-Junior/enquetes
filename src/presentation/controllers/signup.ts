import { HttpResponse, HttpRequest, Controller, EmailValidator } from "../protocols"
import { badRequest, serverError } from "../helpers/http-helper"
import { MissingParamError, InvalidParamError } from "../errors"
import { AddAccount } from "@/domain/usecases/add-account"

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
      this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: "Success"
      }
    } catch (err) {
      return serverError()
    }
  }
}
