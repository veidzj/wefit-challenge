import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

export class AddLegalPersonController implements Controller {
  constructor(private readonly validation: Validation) {}

  public async handle(request: AddLegalPersonController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace AddLegalPersonController {
  export interface Request {
    cnpj: string
    responsibleCpf: string
    name: string
    cellPhone: string
    phone: string
    email: string
    emailConfirmation: string
    cep: string
    street: string
    number: number
    complement: string
    city: string
    neighborhood: string
    state: string
  }
}
