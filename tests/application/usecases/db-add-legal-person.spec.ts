import { faker } from '@faker-js/faker'

import { DbAddLegalPerson } from '@/application/usecases'
import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'
import { type AddLegalPerson } from '@/domain/usecases'

export const mockAddLegalPersonInput = (): AddLegalPerson.Input => ({
  cnpj: faker.string.numeric(14),
  responsibleCpf: faker.string.numeric(11),
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

describe('DbAddLegalPerson', () => {
  describe('CheckLegalPersonByCNPJRepository', () => {
    test('Should call CheckLegalPersonByCNPJRepository with correct cnpj', async() => {
      class CheckLegalPersonByCNPJRepositorySpy implements CheckLegalPersonByCNPJRepository {
        public cnpj: string
        public output: boolean = false

        public async check(cnpj: string): Promise<boolean> {
          this.cnpj = cnpj
          return this.output
        }
      }
      const checkLegalPersonByCNPJRepositorySpy = new CheckLegalPersonByCNPJRepositorySpy()
      const sut = new DbAddLegalPerson(checkLegalPersonByCNPJRepositorySpy)
      const addLegalPersonInput = mockAddLegalPersonInput()

      await sut.add(addLegalPersonInput)

      expect(checkLegalPersonByCNPJRepositorySpy.cnpj).toBe(addLegalPersonInput.cnpj)
    })
  })
})
