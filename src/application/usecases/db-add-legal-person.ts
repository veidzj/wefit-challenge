import { type CheckLegalPersonByCNPJRepository, type AddLegalPersonRepository } from '@/application/protocols'
import { type AddLegalPerson } from '@/domain/usecases'
import { LegalPersonAlreadyExistsError } from '@/domain/errors'

export class DbAddLegalPerson implements AddLegalPerson {
  constructor(
    private readonly checkLegalPersonByCPFRepository: CheckLegalPersonByCNPJRepository,
    private readonly addLegalPersonRepository: AddLegalPersonRepository
  ) {}

  public async add(input: AddLegalPerson.Input): Promise<void> {
    const legalPersonExists = await this.checkLegalPersonByCPFRepository.check(input.cnpj)
    if (legalPersonExists) {
      throw new LegalPersonAlreadyExistsError()
    }
    await this.addLegalPersonRepository.add(input)
  }
}
