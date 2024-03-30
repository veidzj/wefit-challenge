import { type AddLegalPerson } from '@/domain/usecases'

export class AddLegalPersonSpy implements AddLegalPerson {
  public input: AddLegalPerson.Input

  public async add(input: AddLegalPerson.Input): Promise<void> {
    this.input = input
  }
}
