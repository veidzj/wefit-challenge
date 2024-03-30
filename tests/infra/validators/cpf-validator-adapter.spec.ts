import validator from 'validation-br'
import { faker } from '@faker-js/faker'

import { CPFValidatorAdapter } from '@/infra/validators'

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

  test('Should return true if isCPF returns true', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCPF').mockReturnValueOnce(true)

    const isValid = sut.isValid(faker.string.numeric(11))

    expect(isValid).toBe(true)
  })

  test('Should return false if isCPF returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCPF').mockReturnValueOnce(false)

    const isValid = sut.isValid(faker.string.numeric(11))

    expect(isValid).toBe(false)
  })

  test('Should throw if isCPF throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCPF').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.isValid(faker.string.numeric(11))
    }).toThrow()
  })
})
