import { faker } from '@faker-js/faker'

import { PhoneValidation } from '@/validation/validators'
import { PhoneValidatorSpy } from '@/tests/validation/mocks'

interface Sut {
  sut: PhoneValidation
  phoneValidatorSpy: PhoneValidatorSpy
}

const makeSut = (): Sut => {
  const phoneValidatorSpy = new PhoneValidatorSpy()
  const sut = new PhoneValidation(fieldName, phoneValidatorSpy)
  return {
    sut,
    phoneValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('PhoneValidation', () => {
  test('Should call PhoneValidator with correct phone', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    const phone = faker.phone.number()

    sut.validate({
      [fieldName]: phone
    })

    expect(phoneValidatorSpy.phone).toBe(phone)
  })
})
