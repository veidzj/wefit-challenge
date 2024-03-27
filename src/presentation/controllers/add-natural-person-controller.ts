import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { ValidationError } from '@/validation/errors'

export class AddNaturalPersonController implements Controller {
  constructor(private readonly validation: Validation) {}

  public async handle(request: object): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return {
        statusCode: 0,
        body: {}
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          statusCode: 400,
          body: error
        }
      }
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
