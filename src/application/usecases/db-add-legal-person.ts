import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'
import { type AddLegalPerson } from '@/domain/usecases'

export class DbAddLegalPerson implements AddLegalPerson {
  constructor(
    private readonly checkLegalPersonByCPFRepository: CheckLegalPersonByCNPJRepository
  ) {}

  public async add(input: AddLegalPerson.Input): Promise<void> {
    await this.checkLegalPersonByCPFRepository.check(input.cnpj)
  }
}
