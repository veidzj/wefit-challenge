import { CheckLegalPersonByCNPJRepositorySpy, AddLegalPersonRepositorySpy } from '@/tests/application/mocks'
import { mockAddLegalPersonInput } from '@/tests/domain/mocks'
import { DbAddLegalPerson } from '@/application/usecases'
import { LegalPersonAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: DbAddLegalPerson
  checkLegalPersonByCNPJRepositorySpy: CheckLegalPersonByCNPJRepositorySpy
  addLegalPersonRepositorySpy: AddLegalPersonRepositorySpy
}

const makeSut = (): Sut => {
  const checkLegalPersonByCNPJRepositorySpy = new CheckLegalPersonByCNPJRepositorySpy()
  const addLegalPersonRepositorySpy = new AddLegalPersonRepositorySpy()
  const sut = new DbAddLegalPerson(checkLegalPersonByCNPJRepositorySpy, addLegalPersonRepositorySpy)
  return {
    sut,
    checkLegalPersonByCNPJRepositorySpy,
    addLegalPersonRepositorySpy
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

  describe('AddLegalPersonRepository', () => {
    test('Should call AddLegalPersonRepository with correct values', async() => {
      const { sut, addLegalPersonRepositorySpy } = makeSut()
      const addLegalPersonInput = mockAddLegalPersonInput()

      await sut.add(addLegalPersonInput)

      expect(addLegalPersonRepositorySpy.input).toEqual(addLegalPersonInput)
    })

    test('Should throw if AddLegalPersonRepository throws', async() => {
      const { sut, addLegalPersonRepositorySpy } = makeSut()
      jest.spyOn(addLegalPersonRepositorySpy, 'add').mockRejectedValueOnce(new Error())

      const promise = sut.add(mockAddLegalPersonInput())

      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()

      const promise = sut.add(mockAddLegalPersonInput())

      await expect(promise).resolves.not.toThrow()
    })
  })
})
