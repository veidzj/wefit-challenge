import { type CNPJValidator } from '@/validation/protocols'

export class CNPJValidatorSpy implements CNPJValidator {
  public cnpj: string
  public isCNPJValid: boolean = true

  public isValid(cnpj: string): boolean {
    this.cnpj = cnpj
    return this.isCNPJValid
  }
}
