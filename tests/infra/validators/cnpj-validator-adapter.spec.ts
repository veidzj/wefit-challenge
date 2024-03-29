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
})
