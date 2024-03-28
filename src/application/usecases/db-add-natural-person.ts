import { type AddNaturalPersonRepository } from '@/application/protocols'
import { type AddNaturalPerson } from '@/domain/usecases'

export class DbAddNaturalPerson implements AddNaturalPerson {
  constructor(private readonly addNaturalPersonRepository: AddNaturalPersonRepository) {}

  public async add(input: AddNaturalPerson.Input): Promise<void> {
    await this.addNaturalPersonRepository.add(input)
  }
}
