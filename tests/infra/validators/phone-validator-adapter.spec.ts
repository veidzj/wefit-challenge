import validator from 'validator'
import { faker } from '@faker-js/faker'

import { PhoneValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isMobilePhone(): boolean {
    return true
  }
}))

const makeSut = (): PhoneValidatorAdapter => {
  return new PhoneValidatorAdapter()
}

describe('PhoneValidatorAdapter', () => {
  test('Should call isMobilePhone with correct phone', () => {
    const sut = makeSut()
    const isMobilePhoneSpy = jest.spyOn(validator, 'isMobilePhone')
    const phone = faker.phone.number()

    sut.isValid(phone)

    expect(isMobilePhoneSpy).toHaveBeenCalledWith(phone, 'pt-BR')
  })

  test('Should return true if isMobilePhone returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid(faker.phone.number())

    expect(isValid).toBe(true)
  })

  test('Should return true if isMobilePhone returns true', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(false)

    const isValid = sut.isValid(faker.phone.number())

    expect(isValid).toBe(false)
  })

  test('Should throw if isMobilePhone throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMobilePhone').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.isValid(faker.phone.number())
    }).toThrow()
  })
})
