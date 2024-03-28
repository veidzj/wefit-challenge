import { type PhoneValidator } from '@/validation/protocols'

export class PhoneValidatorSpy implements PhoneValidator {
  public phone: string
  public isPhoneValid: boolean = true

  public isValid(phone: string): boolean {
    this.phone = phone
    return this.isPhoneValid
  }
}
