import { faker } from '@faker-js/faker'

import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ControllerSpy implements Controller {
  public request: object
  public httpResponse = HttpHelper.ok({ message: faker.word.words() })

  async handle(request: object): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}
