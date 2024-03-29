import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { mockAddNaturalPersonRepositoryInput } from '@/tests/application/mocks'
import { CheckNaturalPersonByCPFMySQLRepository } from '@/infra/db/mysql/queries'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

describe('CheckNaturalPersonByCPFMySQLRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  afterEach(async() => {
    await clearTable('natural_person')
  })

  test('Should return false if there is no natural person with provided cpf', async() => {
    const sut = new CheckNaturalPersonByCPFMySQLRepository()

    const result = await sut.check(mockAddNaturalPersonRepositoryInput().cpf)

    expect(result).toBe(false)
  })

  test('Should return true if there is a natural person with provided cpf', async() => {
    const mySQLHelper = MySQLHelper.getInstance()
    const connection = mySQLHelper.getConnection()
    const addNaturalPersonRepositoryInput = mockAddNaturalPersonRepositoryInput()
    await connection.execute(
      'INSERT INTO natural_person (cpf, name, cellPhone, phone, email, cep, street, number, complement, city, neighborhood, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [addNaturalPersonRepositoryInput.cpf, addNaturalPersonRepositoryInput.name, addNaturalPersonRepositoryInput.cellPhone, addNaturalPersonRepositoryInput.phone, addNaturalPersonRepositoryInput.email, addNaturalPersonRepositoryInput.address.cep, addNaturalPersonRepositoryInput.address.street, addNaturalPersonRepositoryInput.address.number, addNaturalPersonRepositoryInput.address.complement, addNaturalPersonRepositoryInput.address.city, addNaturalPersonRepositoryInput.address.neighborhood, addNaturalPersonRepositoryInput.address.state]
    )
    const sut = new CheckNaturalPersonByCPFMySQLRepository()

    const result = await sut.check(addNaturalPersonRepositoryInput.cpf)

    expect(result).toBe(true)
  })
})
