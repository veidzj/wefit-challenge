import { faker } from '@faker-js/faker'

import { CompareFieldsValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

const field: string = faker.word.words()
const fieldToCompare: string = faker.word.words()

describe('CompareFieldsValidation', () => {
  test('Should throw ValidationError if fields are different', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({
        [field]: faker.word.words(),
        [fieldToCompare]: faker.word.words()
      })
    }).toThrow(new ValidationError(`${field} needs to be equal to ${fieldToCompare}`))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()
    const fieldValue = faker.word.words()

    expect(() => {
      sut.validate({
        [field]: fieldValue,
        [fieldToCompare]: fieldValue
      })
    }).not.toThrow()
  })
})
