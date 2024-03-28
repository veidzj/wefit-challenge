import { faker } from '@faker-js/faker'

import { PhoneValidatorSpy } from '@/tests/validation/mocks'
import { PhoneValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

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

  test('Should throw ValidationError if PhoneValidator returns false', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    phoneValidatorSpy.isPhoneValid = false

    expect(() => {
      sut.validate({ [fieldName]: faker.phone.number() })
    }).toThrow(new ValidationError(`${fieldName} must be a valid phone number`))
  })

  test('Should throw if PhoneValidator throws', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    jest.spyOn(phoneValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.validate({ [fieldName]: faker.phone.number() })
    }).toThrow()
  })

  test('Should not throw on success', () => {
    const { sut } = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.phone.number() })
    }).not.toThrow()
  })
})
