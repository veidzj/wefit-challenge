import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class CepValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    const cpf: string = input[this.fieldName]
    console.log(cpf)
    if (!/^\d{5}-\d{3}$/.test(cpf)) {
      throw new ValidationError(`${this.fieldName} must be a valid CEP`)
    }
  }
}
