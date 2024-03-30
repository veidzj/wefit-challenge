import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { mockAddLegalPersonRepositoryInput } from '@/tests/application/mocks'
import { CheckLegalPersonByCNPJMySQLRepository } from '@/infra/db/mysql/queries'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

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

  test('Should return true if there is a legal person with provided cnpj', async() => {
    const mySQLHelper = MySQLHelper.getInstance()
    const connection = mySQLHelper.getConnection()
    const addLegalPersonRepositoryInput = mockAddLegalPersonRepositoryInput()
    await connection.execute(
      'INSERT INTO legal_person (cnpj, responsibleCpf, name, cellPhone, phone, email, cep, street, number, complement, city, neighborhood, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [addLegalPersonRepositoryInput.cnpj, addLegalPersonRepositoryInput.responsibleCpf, addLegalPersonRepositoryInput.name, addLegalPersonRepositoryInput.cellPhone, addLegalPersonRepositoryInput.phone, addLegalPersonRepositoryInput.email, addLegalPersonRepositoryInput.cep, addLegalPersonRepositoryInput.street, addLegalPersonRepositoryInput.number, addLegalPersonRepositoryInput.complement, addLegalPersonRepositoryInput.city, addLegalPersonRepositoryInput.neighborhood, addLegalPersonRepositoryInput.state]
    )
    const sut = new CheckLegalPersonByCNPJMySQLRepository()

    const result = await sut.check(addLegalPersonRepositoryInput.cnpj)

    expect(result).toBe(true)
  })
})
