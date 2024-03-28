import { type CNPJValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class CNPJValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly cnpjValidator: CNPJValidator
  ) {}

  public validate(input: object): void {
    const cnpj: string = input[this.fieldName]
    if (!this.cnpjValidator.isValid(cnpj)) {
      throw new ValidationError(`${this.fieldName} must be a valid CNPJ`)
    }
  }
}
