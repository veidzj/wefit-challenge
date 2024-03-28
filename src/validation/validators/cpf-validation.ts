import { type CPFValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class CPFValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly cpfValidator: CPFValidator
  ) {}

  public validate(input: object): void {
    const cpf: string = input[this.fieldName]
    if (!this.cpfValidator.isValid(cpf)) {
      throw new ValidationError(`${this.fieldName} must be a valid CPF`)
    }
  }
}
