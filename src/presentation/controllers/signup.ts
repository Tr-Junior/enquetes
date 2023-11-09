import { MissingParamError } from "../errors/missing-param-error"
import { HttpResponse, HttpRequest } from "../protocols/http"
import { badRequest } from "../helpers/http-helper"
import { Controller } from "../protocols/controller"

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    // Add a default return statement here
    return {
      statusCode: 200,
      body: "Success"
    }
  }
}
