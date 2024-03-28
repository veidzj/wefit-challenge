import { faker } from '@faker-js/faker'

import { CPFValidatorSpy } from '@/tests/validation/mocks'
import { CPFValidation } from '@/validation/validators'

interface Sut {
  sut: CPFValidation
  cpfValidatorSpy: CPFValidatorSpy
}

const makeSut = (): Sut => {
  const cpfValidatorSpy = new CPFValidatorSpy()
  const sut = new CPFValidation(fieldName, cpfValidatorSpy)
  return {
    sut,
    cpfValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('CPFValidation', () => {
  test('Should call CPFValidator with correct cpf', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const cpf = faker.string.numeric(11)

    sut.validate({
      [fieldName]: cpf
    })

    expect(cpfValidatorSpy.cpf).toBe(cpf)
  })
})
