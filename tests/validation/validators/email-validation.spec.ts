import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { type EmailValidator } from '@/validation/protocols'

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    class EmailValidatorSpy implements EmailValidator {
      public email: string

      public isValid(email: string): boolean {
        this.email = email
        return true
      }
    }
    const emailValidatorSpy = new EmailValidatorSpy()
    const fieldName: string = faker.word.words()
    const sut = new EmailValidation(fieldName, emailValidatorSpy)
    const email = faker.internet.email()
    sut.validate({ [fieldName]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })
})
