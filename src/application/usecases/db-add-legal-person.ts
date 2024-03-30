import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'
import { type AddLegalPerson } from '@/domain/usecases'
import { LegalPersonAlreadyExistsError } from '@/domain/errors'

export class DbAddLegalPerson implements AddLegalPerson {
  constructor(
    private readonly checkLegalPersonByCPFRepository: CheckLegalPersonByCNPJRepository
  ) {}

  public async add(input: AddLegalPerson.Input): Promise<void> {
    const legalPersonExists = await this.checkLegalPersonByCPFRepository.check(input.cnpj)
    if (legalPersonExists) {
      throw new LegalPersonAlreadyExistsError()
    }
  }
}
