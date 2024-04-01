import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks'
import { LogErrorRepositorySpy } from '@/tests/application/mocks'
import { LogErrorDecorator } from '@/main/decorators'
import { type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

interface Sut {
  sut: LogErrorDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): Sut => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogErrorDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

const mockRequest = (): object => ({
  field: faker.word.words()
})

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = faker.word.words()
  return HttpHelper.serverError(fakeError)
}

describe('LogErrorDecorator', () => {
  describe('Controller', () => {
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

  describe('LogErrorRepository', () => {
    test('Should not call LogErrorRepositoy if controller does not returns a server error', async() => {
      const { sut, logErrorRepositorySpy } = makeSut()
      jest.spyOn(logErrorRepositorySpy, 'log')

      await sut.handle(mockRequest())

      expect(logErrorRepositorySpy.log).toHaveBeenCalledTimes(0)
      expect(logErrorRepositorySpy.stack).toBeUndefined()
    })

    test('Should call LogErrorRepositoy with correct error if controller returns a server error', async() => {
      const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
      jest.spyOn(logErrorRepositorySpy, 'log')
      const serverError = mockServerError()
      controllerSpy.httpResponse = serverError

      await sut.handle(mockRequest())

      expect(logErrorRepositorySpy.log).toHaveBeenCalledTimes(1)
      expect(logErrorRepositorySpy.stack).toBe(controllerSpy.httpResponse.body.stack)
    })
  })
})
