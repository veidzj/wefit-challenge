import {
  CheckNaturalPersonByCPFRepositorySpy,
  AddNaturalPersonRepositorySpy,
  mockAddNaturalPersonRepositoryInput
} from '@/tests/application/mocks'
import { DbAddNaturalPerson } from '@/application/usecases'
import { NaturalPersonAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: DbAddNaturalPerson
  checkNaturalPersonByCPFRepositorySpy: CheckNaturalPersonByCPFRepositorySpy
  addNaturalPersonRepositorySpy: AddNaturalPersonRepositorySpy
}

const makeSut = (): Sut => {
  const checkNaturalPersonByCPFRepositorySpy = new CheckNaturalPersonByCPFRepositorySpy()
  const addNaturalPersonRepositorySpy = new AddNaturalPersonRepositorySpy()
  const sut = new DbAddNaturalPerson(checkNaturalPersonByCPFRepositorySpy, addNaturalPersonRepositorySpy)
  return {
    sut,
    checkNaturalPersonByCPFRepositorySpy,
    addNaturalPersonRepositorySpy
  }
}

describe('DbAddNaturalPerson', () => {
  describe('CheckNaturalPersonByCPFRepository', () => {
    test('Should call CheckNaturalPersonByCPFRepository with correct cpf', async() => {
      const { sut, checkNaturalPersonByCPFRepositorySpy } = makeSut()
      const addNaturalPersonRepositoryInput = mockAddNaturalPersonRepositoryInput()

      await sut.add(addNaturalPersonRepositoryInput)

      expect(checkNaturalPersonByCPFRepositorySpy.cpf).toBe(addNaturalPersonRepositoryInput.cpf)
    })

    test('Should throw NaturalPersonAlreadyExists if CheckNaturalPersonByCPFRepository returns true', async() => {
      const { sut, checkNaturalPersonByCPFRepositorySpy } = makeSut()
      checkNaturalPersonByCPFRepositorySpy.output = true

      const promise = sut.add(mockAddNaturalPersonRepositoryInput())

      await expect(promise).rejects.toThrow(new NaturalPersonAlreadyExistsError())
    })
  })

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
