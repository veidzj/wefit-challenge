import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { mockAddLegalPersonRepositoryInput } from '@/tests/application/mocks'
import { CheckLegalPersonByCNPJMySQLRepository } from '@/infra/db/mysql/queries'

describe('CheckLegalPersonByCNPJMySQLRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  afterEach(async() => {
    await clearTable('legal_person')
  })

  test('Should return false if there is no legal person with provided cnpj', async() => {
    const sut = new CheckLegalPersonByCNPJMySQLRepository()

    const result = await sut.check(mockAddLegalPersonRepositoryInput().cnpj)

    expect(result).toBe(false)
  })
})
