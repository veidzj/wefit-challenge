import { faker } from '@faker-js/faker'

import { RequiredFieldValidator } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const fieldName: string = faker.word.words()

describe('RequiredFieldValidator', () => {
  test('Should throw ValidationError if field is not provided', () => {
    const sut = new RequiredFieldValidator(fieldName)

    expect(() => {
      sut.validate({
        [fieldName]: ''
      })
    }).toThrow(new ValidationError(`${fieldName} is required`))
  })

  test('Should not throw on success', () => {
    const sut = new RequiredFieldValidator(fieldName)

    expect(() => {
      sut.validate({
        [fieldName]: faker.word.words()
      })
    }).not.toThrow()
  })
})
