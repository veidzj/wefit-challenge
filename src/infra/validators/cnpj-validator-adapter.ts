import validator from 'validation-br'

import { type CNPJValidator } from '@/validation/protocols'

export class CNPJValidatorAdapter implements CNPJValidator {
  public isValid(cnpj: string): boolean {
    return validator.isCNPJ(cnpj)
  }
}
