import { faker } from '@faker-js/faker'

import { CPFValidation } from '@/validation/validators'
import { type CPFValidator } from '@/validation/protocols'

const fieldName: string = faker.word.words()

describe('CPFValidation', () => {
  test('Should call CPFValidator with correct cpf', () => {
    class CPFValidatorSpy implements CPFValidator {
      public cpf: string
      public isCPFValid: boolean = true

      public isValid(cpf: string): boolean {
        this.cpf = cpf
        return this.isCPFValid
      }
    }
    const cpfValidatorSpy = new CPFValidatorSpy()
    const sut = new CPFValidation(fieldName, cpfValidatorSpy)
    const cpf = faker.string.numeric(11)

    sut.validate({
      [fieldName]: cpf
    })

    expect(cpfValidatorSpy.cpf).toBe(cpf)
  })
})
