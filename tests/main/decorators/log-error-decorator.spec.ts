import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks'
import { LogErrorRepositorySpy } from '@/tests/application/mocks'
import { LogErrorDecorator } from '@/main/decorators'

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
  })
})
