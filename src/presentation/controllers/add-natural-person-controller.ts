import { type Validation } from '@/presentation/protocols'

export class AddNaturalPersonController {
  constructor(private readonly validation: Validation) {}

  public async handle(request: object): Promise<void> {
    this.validation.validate(request)
  }
}
