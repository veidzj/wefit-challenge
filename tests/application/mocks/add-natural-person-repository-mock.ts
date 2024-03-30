import { faker } from '@faker-js/faker'

import { type AddNaturalPersonRepository } from '@/application/protocols'

export class AddNaturalPersonRepositorySpy implements AddNaturalPersonRepository {
  public input: AddNaturalPersonRepository.Input

  public async add(input: AddNaturalPersonRepository.Input): Promise<void> {
    this.input = input
  }
}

export const mockAddNaturalPersonRepositoryInput = (): AddNaturalPersonRepository.Input => ({
  cpf: faker.string.numeric(11),
  name: faker.person.fullName(),
  cellPhone: faker.helpers.fromRegExp(/([0-9]{2}) [0-9]{5}-[0-9]{4}/),
  phone: faker.helpers.fromRegExp(/([0-9]{2}) [0-9]{4}-[0-9]{4}/),
  email: faker.internet.email(),
  cep: faker.location.zipCode(),
  street: faker.location.street(),
  number: faker.number.int(1000),
  complement: faker.location.secondaryAddress(),
  city: faker.location.city(),
  neighborhood: faker.location.secondaryAddress(),
  state: faker.location.state()
})
