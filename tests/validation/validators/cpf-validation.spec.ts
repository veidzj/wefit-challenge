import { faker } from '@faker-js/faker'

import { CPFValidatorSpy } from '@/tests/validation/mocks'
import { CPFValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

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

  test('Should throw ValidationError if CPFValidator returns false', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.isCPFValid = false

    expect(() => {
      sut.validate({ [fieldName]: faker.string.numeric(11) })
    }).toThrow(new ValidationError(`${fieldName} must be a valid CPF`))
  })

  test('Should throw if CPFValidator throws', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    jest.spyOn(cpfValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.validate({ [fieldName]: faker.string.numeric(11) })
    }).toThrow()
  })

  test('Should not throw on success', () => {
    const { sut } = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.numeric(11) })
    }).not.toThrow()
  })
})
