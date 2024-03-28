import { AddNaturalPersonRepositorySpy, mockAddNaturalPersonRepositoryInput } from '@/tests/application/mocks'
import { DbAddNaturalPerson } from '@/application/usecases'

interface Sut {
  sut: DbAddNaturalPerson
  addNaturalPersonRepositorySpy: AddNaturalPersonRepositorySpy
}

const makeSut = (): Sut => {
  const addNaturalPersonRepositorySpy = new AddNaturalPersonRepositorySpy()
  const sut = new DbAddNaturalPerson(addNaturalPersonRepositorySpy)
  return {
    sut,
    addNaturalPersonRepositorySpy
  }
}

describe('DbAddNaturalPerson', () => {
  describe('AddNaturalPersonRepository', () => {
    test('Should call AddNaturalPersonRepository with correct values', async() => {
      const { sut, addNaturalPersonRepositorySpy } = makeSut()
      const addNaturalPersonRepositoryInput = mockAddNaturalPersonRepositoryInput()

      await sut.add(addNaturalPersonRepositoryInput)

      expect(addNaturalPersonRepositorySpy.input).toEqual(addNaturalPersonRepositoryInput)
    })

    test('Should throw if AddNaturalPersonRepository throws', async() => {
      const { sut, addNaturalPersonRepositorySpy } = makeSut()
      jest.spyOn(addNaturalPersonRepositorySpy, 'add').mockRejectedValueOnce(new Error())

      const promise = sut.add(mockAddNaturalPersonRepositoryInput())

      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()

      const promise = sut.add(mockAddNaturalPersonRepositoryInput())

      await expect(promise).resolves.not.toThrow()
    })
  })
})
