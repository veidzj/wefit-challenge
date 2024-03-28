import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type Address } from '@/domain/models'
import { type AddNaturalPerson } from '@/domain/usecases'
import { NaturalPersonAlreadyExistsError } from '@/domain/errors'

export class AddNaturalPersonController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addNaturalPerson: AddNaturalPerson
  ) {}

  public async handle(request: AddNaturalPersonController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.addNaturalPerson.add(request)
      return HttpHelper.ok({ message: 'Natural person successfully registered' })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof NaturalPersonAlreadyExistsError) {
        return HttpHelper.conflict(error)
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
