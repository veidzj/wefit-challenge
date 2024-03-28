import { faker } from '@faker-js/faker'

import { CompareFieldsValidator } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): CompareFieldsValidator => {
  return new CompareFieldsValidator(field, fieldToCompare)
}

const field: string = faker.word.words()
const fieldToCompare: string = faker.word.words()

describe('CompareFieldsValidator', () => {
  test('Should throw ValidationError if fields are different', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({
        [field]: faker.word.words(),
        [fieldToCompare]: faker.word.words()
      })
    }).toThrow(new ValidationError(`${field} needs to be equal to ${fieldToCompare}`))
  })
})
