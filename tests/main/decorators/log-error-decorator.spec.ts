import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks'
import { LogErrorDecorator } from '@/main/decorators'

interface Sut {
  sut: LogErrorDecorator
  controllerSpy: ControllerSpy
}

const makeSut = (): Sut => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogErrorDecorator(controllerSpy)
  return {
    sut,
    controllerSpy
  }
}

const mockRequest = (): object => ({
  field: faker.word.words()
})

describe('LogErrorDecorator', () => {
  test('Should call Controller with correct values', async() => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async() => {
    const { sut, controllerSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })
})
