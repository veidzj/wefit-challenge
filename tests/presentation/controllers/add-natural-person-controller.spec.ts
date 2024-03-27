import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddNaturalPersonController } from '@/presentation/controllers'

interface Sut {
  sut: AddNaturalPersonController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new AddNaturalPersonController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AddNaturalPersonController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    await sut.handle({})
    expect(validationSpy.input).toEqual({})
  })

  test('Should return serverError if Validation throws', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({ statusCode: 500, body: new Error() })
  })
})
