import { faker } from '@faker-js/faker'

import { LogErrorDecorator } from '@/main/decorators'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

const mockRequest = (): object => ({
  field: faker.word.words()
})

describe('LogErrorDecorator', () => {
  test('Should call Controller with correct values', async() => {
    class ControllerSpy implements Controller {
      public request: object
      public httpResponse = HttpHelper.ok({ message: faker.word.words() })

      async handle(request: object): Promise<HttpResponse> {
        this.request = request
        return this.httpResponse
      }
    }
    const controllerSpy = new ControllerSpy()
    const sut = new LogErrorDecorator(controllerSpy)
    const request = mockRequest()

    await sut.handle(request)

    expect(controllerSpy.request).toEqual(request)
  })
})
