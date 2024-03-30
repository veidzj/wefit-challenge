import { faker } from '@faker-js/faker'

import { CepValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): CepValidation => {
  return new CepValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('CepValidation', () => {
  test('Should throw ValidationError if cep is invalid', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({
        [fieldName]: faker.location.zipCode()
      })
    }).toThrow(new ValidationError(`${fieldName} must be a valid CEP`))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({
        [fieldName]: faker.location.zipCode('#####-###')
      })
    }).not.toThrow()
  })
})
