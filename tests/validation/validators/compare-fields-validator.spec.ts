import { faker } from '@faker-js/faker'

import { CompareFieldsValidator } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('CompareFieldsValidator', () => {
  test('Should throw ValidationError if fields are different', () => {
    const field: string = faker.word.words()
    const fieldToCompare: string = faker.word.words()
    const sut = new CompareFieldsValidator(field, fieldToCompare)
    expect(() => {
      sut.validate({
        [field]: faker.word.words(),
        [fieldToCompare]: faker.word.words()
      })
    }).toThrow(new ValidationError(`${field} needs to be equal to ${fieldToCompare}`))
  })
})
