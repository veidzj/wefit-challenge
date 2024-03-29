import validator from 'validation-br'
import { faker } from '@faker-js/faker'

import { CPFValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isCPF(): boolean {
    return true
  }
}))

const makeSut = (): CPFValidatorAdapter => {
  return new CPFValidatorAdapter()
}

describe('CPFValidatorAdapter', () => {
  test('Should call isCPF with correct cpf', () => {
    const sut = makeSut()
    const isCPFSpy = jest.spyOn(validator, 'isCPF')
    const cpf = faker.string.numeric(11)

    sut.isValid(cpf)

    expect(isCPFSpy).toHaveBeenCalledWith(cpf)
  })
})
