import validator from 'validator'

import { type PhoneValidator } from '@/validation/protocols'

export class PhoneValidatorAdapter implements PhoneValidator {
  public isValid(phone: string): boolean {
    return validator.isMobilePhone(phone, 'pt-BR')
  }
}
