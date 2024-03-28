import { type AddNaturalPerson } from '@/domain/usecases'

export class AddNaturalPersonSpy implements AddNaturalPerson {
  public input: AddNaturalPerson.Input

  public async add(input: AddNaturalPerson.Input): Promise<void> {
    this.input = input
  }
}
