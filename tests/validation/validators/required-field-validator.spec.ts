import { RequiredFieldValidator } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const fieldName: string = 'fieldName'

describe('RequiredFieldValidator', () => {
  test('Should throw ValidationError if field is not provided', () => {
    const sut = new RequiredFieldValidator(fieldName)

    expect(() => {
      sut.validate({
        [fieldName]: ''
      })
    }).toThrow(new ValidationError(`${fieldName} is required`))
  })
})
