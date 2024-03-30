import { DbAddLegalPerson } from '@/application/usecases'
import { mockAddLegalPersonInput } from '@/tests/domain/mocks'
import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'

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
