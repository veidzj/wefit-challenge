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
  })
})
