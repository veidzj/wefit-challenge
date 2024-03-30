import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddLegalPersonSpy } from '@/tests/domain/mocks'
import { AddLegalPersonController } from '@/presentation/controllers'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { LegalPersonAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: AddLegalPersonController
  validationSpy: ValidationSpy
  addLegalPersonSpy: AddLegalPersonSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addLegalPersonSpy = new AddLegalPersonSpy()
  const sut = new AddLegalPersonController(validationSpy, addLegalPersonSpy)
  return {
    sut,
    validationSpy,
    addLegalPersonSpy
  }
}

const mockRequest = (): AddLegalPersonController.Request => ({
  cnpj: faker.string.numeric(14),
  responsibleCpf: faker.string.numeric(11),
  name: faker.person.fullName(),
  cellPhone: faker.phone.number(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  emailConfirmation: faker.internet.email(),
  cep: faker.location.zipCode(),
  street: faker.location.street(),
  number: faker.number.int(1000),
  complement: faker.location.secondaryAddress(),
  city: faker.location.city(),
  neighborhood: faker.location.secondaryAddress(),
  state: faker.location.state()
})

describe('AddLegalPersonController', () => {
  describe('Validation', () => {
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

  describe('AddLegalPerson', () => {
    test('Should call AddLegalPerson with correct values', async() => {
      const { sut, addLegalPersonSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(addLegalPersonSpy.input).toEqual(request)
    })

    test('Should return conflict if AddLegalPerson throws LegalPersonAlreadyExistsError', async() => {
      const { sut, addLegalPersonSpy } = makeSut()
      jest.spyOn(addLegalPersonSpy, 'add').mockRejectedValueOnce(new LegalPersonAlreadyExistsError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.conflict(new LegalPersonAlreadyExistsError()))
    })

    test('Should return serverError if AddLegalPerson throws', async() => {
      const { sut, addLegalPersonSpy } = makeSut()
      jest.spyOn(addLegalPersonSpy, 'add').mockRejectedValueOnce(new Error())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
    })
  })
})
