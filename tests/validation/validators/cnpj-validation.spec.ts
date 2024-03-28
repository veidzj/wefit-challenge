import { faker } from '@faker-js/faker'

import { CNPJValidatorSpy } from '@/tests/validation/mocks'
import { CNPJValidation } from '@/validation/validators'

const fieldName: string = faker.word.words()

describe('CNPJValidation', () => {
  test('Should call CNPJValidator with correct cnpj', () => {
    const cnpjValidatorSpy = new CNPJValidatorSpy()
    const sut = new CNPJValidation(fieldName, cnpjValidatorSpy)
    const cnpj = faker.string.numeric(14)

    sut.validate({
      [fieldName]: cnpj
    })

    expect(cnpjValidatorSpy.cnpj).toBe(cnpj)
  })
})
