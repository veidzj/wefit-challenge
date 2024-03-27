import { AddNaturalPersonController } from '@/presentation/controllers'
import { type Validation } from '../protocols'

describe('AddNaturalPersonController', () => {
  test('Should call Validation with correct values', async() => {
    class ValidationSpy implements Validation {
      public input: object

      public validate(input: object): void {
        this.input = input
      }
    }
    const validationSpy = new ValidationSpy()
    const sut = new AddNaturalPersonController(validationSpy)
    await sut.handle({})
    expect(validationSpy.input).toEqual({})
  })

  test('Should return serverError if Validation throws', async() => {
    class ValidationSpy implements Validation {
      public input: object

      public validate(input: object): void {
        this.input = input
      }
    }
    const validationSpy = new ValidationSpy()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const sut = new AddNaturalPersonController(validationSpy)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({ statusCode: 500, body: new Error() })
  })
})
