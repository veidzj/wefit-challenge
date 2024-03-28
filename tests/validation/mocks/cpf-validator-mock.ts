import { type CPFValidator } from '@/validation/protocols'

export class CPFValidatorSpy implements CPFValidator {
  public cpf: string
  public isCPFValid: boolean = true

  public isValid(cpf: string): boolean {
    this.cpf = cpf
    return this.isCPFValid
  }
}
