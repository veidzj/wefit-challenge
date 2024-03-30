import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddLegalPersonController } from '@/presentation/controllers'

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
      const validationSpy = new ValidationSpy()
      const sut = new AddLegalPersonController(validationSpy)
      const request = mockRequest()

      await sut.handle(request)

      expect(validationSpy.input).toEqual(request)
    })
  })
})
