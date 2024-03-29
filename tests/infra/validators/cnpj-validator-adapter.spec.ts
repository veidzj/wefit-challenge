import validator from 'validation-br'
import { faker } from '@faker-js/faker'

import { CNPJValidatorAdapter } from '@/infra/validators'

const makeSut = (): CNPJValidatorAdapter => {
  return new CNPJValidatorAdapter()
}

describe('CNPJValidatorAdapter', () => {
  test('Should call isCNPJ with correct cnpj', () => {
    const sut = makeSut()
    const isCNPJSpy = jest.spyOn(validator, 'isCNPJ')
    const cnpj = faker.string.numeric(14)

    sut.isValid(cnpj)

    expect(isCNPJSpy).toHaveBeenCalledWith(cnpj)
  })

  test('Should return true if isCNPJ returns true', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCNPJ').mockReturnValueOnce(true)

    const isValid = sut.isValid(faker.string.numeric(14))

    expect(isValid).toBe(true)
  })

  test('Should return false if isCNPJ returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCNPJ').mockReturnValueOnce(false)

    const isValid = sut.isValid(faker.string.numeric(14))

    expect(isValid).toBe(false)
  })

  test('Should throw if isCNPJ throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCNPJ').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.isValid(faker.string.numeric(14))
    }).toThrow()
  })
})
