import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddNaturalPersonController } from '@/presentation/controllers'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

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

  test('Should return badRequest if Validation throws ValidationError', async() => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = 'error'
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
  })

  test('Should return serverError if Validation throws', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
  })
})
