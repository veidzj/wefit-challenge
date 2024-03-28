import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  public validate(input: object): void {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      throw new ValidationError(`${this.fieldName} needs to be equal to ${this.fieldToCompareName}`)
    }
  }
}
