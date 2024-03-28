import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type Address } from '@/domain/models'

export class AddNaturalPersonController implements Controller {
  constructor(private readonly validation: Validation) {}

  public async handle(request: AddNaturalPersonController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return {
        statusCode: 0,
        body: {}
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace AddNaturalPersonController {
  export interface Request {
    cpf: string
    name: string
    cellPhone: string
    phone: string
    email: string
    emailConfirmation: string
    address: Address
  }
}
