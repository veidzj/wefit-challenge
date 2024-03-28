import { faker } from '@faker-js/faker'

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

const mockRequest = (): AddNaturalPersonController.Request => ({
  cpf: faker.string.numeric(11),
  name: faker.person.fullName(),
  cellPhone: faker.phone.number(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  emailConfirmation: faker.internet.email(),
  address: {
    cep: faker.location.zipCode(),
    street: faker.location.street(),
    number: faker.number.int(1000),
    complement: faker.location.secondaryAddress(),
    city: faker.location.city(),
    neighborhood: faker.location.secondaryAddress(),
    state: faker.location.state()
  }
})

describe('AddNaturalPersonController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(validationSpy.input).toEqual(request)
  })

  test('Should return badRequest if Validation throws ValidationError', async() => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
  })

  test('Should return serverError if Validation throws', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
  })
})
