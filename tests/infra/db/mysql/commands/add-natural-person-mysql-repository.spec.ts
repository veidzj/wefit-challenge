import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { mockAddNaturalPersonRepositoryInput } from '@/tests/application/mocks'
import { AddNaturalPersonMySQLRepository } from '@/infra/db/mysql/commands'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

describe('AddNaturalPersonMySQLRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  afterEach(async() => {
    await clearTable('natural_person')
  })

  test('Should add a natural person on success', async() => {
    const mySQLHelper = MySQLHelper.getInstance()
    const connection = mySQLHelper.getConnection()
    const sut = new AddNaturalPersonMySQLRepository()
    const addNaturalPersonRepositoryInput = mockAddNaturalPersonRepositoryInput()

    await sut.add(addNaturalPersonRepositoryInput)

    const [rows] = await connection.execute('SELECT * FROM natural_person')
    expect(rows[0].id).toBeTruthy()
    expect(rows[0].cpf).toBe(addNaturalPersonRepositoryInput.cpf)
    expect(rows[0].name).toBe(addNaturalPersonRepositoryInput.name)
    expect(rows[0].cellPhone).toBe(addNaturalPersonRepositoryInput.cellPhone)
    expect(rows[0].phone).toBe(addNaturalPersonRepositoryInput.phone)
    expect(rows[0].cep).toBe(addNaturalPersonRepositoryInput.cep)
    expect(rows[0].street).toBe(addNaturalPersonRepositoryInput.street)
    expect(rows[0].number).toBe(addNaturalPersonRepositoryInput.number)
    expect(rows[0].complement).toBe(addNaturalPersonRepositoryInput.complement)
    expect(rows[0].city).toBe(addNaturalPersonRepositoryInput.city)
    expect(rows[0].neighborhood).toBe(addNaturalPersonRepositoryInput.neighborhood)
    expect(rows[0].state).toBe(addNaturalPersonRepositoryInput.state)
  })
})
