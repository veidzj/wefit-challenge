import validator from 'validation-br'

import { type CPFValidator } from '@/validation/protocols'

export class CPFValidatorAdapter implements CPFValidator {
  public isValid(cpf: string): boolean {
    return validator.isCPF(cpf)
  }
}
