import { type AddLegalPersonRepository } from '@/application/protocols'

export class AddLegalPersonRepositorySpy implements AddLegalPersonRepository {
  public input: AddLegalPersonRepository.Input

  public async add(input: AddLegalPersonRepository.Input): Promise<void> {
    this.input = input
  }
}
