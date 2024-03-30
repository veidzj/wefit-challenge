import { CheckLegalPersonByCNPJRepositorySpy } from '@/tests/application/mocks'
import { mockAddLegalPersonInput } from '@/tests/domain/mocks'
import { DbAddLegalPerson } from '@/application/usecases'
import { LegalPersonAlreadyExistsError } from '@/domain/errors'

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

    test('Should throw LegalPersonAlreadyExistsError if CheckLegalPersonByCNPJRepository returns true', async() => {
      const { sut, checkLegalPersonByCNPJRepositorySpy } = makeSut()
      checkLegalPersonByCNPJRepositorySpy.output = true

      const promise = sut.add(mockAddLegalPersonInput())

      await expect(promise).rejects.toThrow(new LegalPersonAlreadyExistsError())
    })

    test('Should throw if CheckLegalPersonByCNPJRepository throws', async() => {
      const { sut, checkLegalPersonByCNPJRepositorySpy } = makeSut()
      jest.spyOn(checkLegalPersonByCNPJRepositorySpy, 'check').mockRejectedValueOnce(new Error())

      const promise = sut.add(mockAddLegalPersonInput())

      await expect(promise).rejects.toThrow()
    })
  })
})
