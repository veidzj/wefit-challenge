import { CheckLegalPersonByCNPJRepositorySpy } from '@/tests/application/mocks'
import { mockAddLegalPersonInput } from '@/tests/domain/mocks'
import { DbAddLegalPerson } from '@/application/usecases'

interface Sut {
  sut: DbAddLegalPerson
  checkLegalPersonByCNPJRepositorySpy: CheckLegalPersonByCNPJRepositorySpy
}

const makeSut = (): Sut => {
  const checkLegalPersonByCNPJRepositorySpy = new CheckLegalPersonByCNPJRepositorySpy()
  const sut = new DbAddLegalPerson(checkLegalPersonByCNPJRepositorySpy)
  return {
    sut,
    checkLegalPersonByCNPJRepositorySpy
  }
}

describe('DbAddLegalPerson', () => {
  describe('CheckLegalPersonByCNPJRepository', () => {
    test('Should call CheckLegalPersonByCNPJRepository with correct cnpj', async() => {
      const { sut, checkLegalPersonByCNPJRepositorySpy } = makeSut()
      const addLegalPersonInput = mockAddLegalPersonInput()

      await sut.add(addLegalPersonInput)

      expect(checkLegalPersonByCNPJRepositorySpy.cnpj).toBe(addLegalPersonInput.cnpj)
    })
  })
})
