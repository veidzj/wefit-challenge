import { faker } from '@faker-js/faker'

import { PhoneValidation } from '@/validation/validators'
import { type PhoneValidator } from '@/validation/protocols'

describe('PhoneValidation', () => {
  test('Should call PhoneValidator with correct phone', () => {
    const fieldName: string = faker.word.words()
    class PhoneValidatorSpy implements PhoneValidator {
      public phone: string
      public isPhoneValid: boolean = true

      public isValid(phone: string): boolean {
        this.phone = phone
        return this.isPhoneValid
      }
    }
    const phoneValidatorSpy = new PhoneValidatorSpy()
    const sut = new PhoneValidation(fieldName, phoneValidatorSpy)
    const phone = faker.phone.number()

    sut.validate({
      [fieldName]: phone
    })

    expect(phoneValidatorSpy.phone).toBe(phone)
  })
})
