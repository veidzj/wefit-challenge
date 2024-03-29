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
})
