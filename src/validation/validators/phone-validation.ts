import { type PhoneValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PhoneValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly phoneValidator: PhoneValidator
  ) {}

  public validate(input: object): void {
    const phone: string = input[this.fieldName]
    if (!this.phoneValidator.isValid(phone)) {
      throw new ValidationError(`${this.fieldName} must be a valid phone number`)
    }
  }
}
