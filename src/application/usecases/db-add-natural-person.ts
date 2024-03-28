import { type CheckNaturalPersonByCPFRepository, type AddNaturalPersonRepository } from '@/application/protocols'
import { type AddNaturalPerson } from '@/domain/usecases'
import { NaturalPersonAlreadyExistsError } from '@/domain/errors'

export class DbAddNaturalPerson implements AddNaturalPerson {
  constructor(
    private readonly checkNaturalPersonByCPFRepository: CheckNaturalPersonByCPFRepository,
    private readonly addNaturalPersonRepository: AddNaturalPersonRepository
  ) {}

  public async add(input: AddNaturalPerson.Input): Promise<void> {
    const naturalPersonExists = await this.checkNaturalPersonByCPFRepository.check(input.cpf)
    if (naturalPersonExists) {
      throw new NaturalPersonAlreadyExistsError()
    }
    await this.addNaturalPersonRepository.add(input)
  }
}
