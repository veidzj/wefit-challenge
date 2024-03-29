import validator from 'validator'
import { faker } from '@faker-js/faker'

import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Should call isEmail with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const email = faker.internet.email()

    sut.isValid(email)

    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })

  test('Should return true if isEmail returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid(faker.internet.email())

    expect(isValid).toBe(true)
  })
})
