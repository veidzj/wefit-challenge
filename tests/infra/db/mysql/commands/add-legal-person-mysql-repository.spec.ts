import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { mockAddLegalPersonRepositoryInput } from '@/tests/application/mocks'
import { AddLegalPersonMySQLRepository } from '@/infra/db/mysql/commands'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

describe('AddLegalPersonMySQLRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  afterEach(async() => {
    await clearTable('legal_person')
  })

  test('Should add a legal person on success', async() => {
    const mySQLHelper = MySQLHelper.getInstance()
    const connection = mySQLHelper.getConnection()
    const sut = new AddLegalPersonMySQLRepository()
    const addLegalPersonRepositoryInput = mockAddLegalPersonRepositoryInput()

    await sut.add(addLegalPersonRepositoryInput)

    const [rows] = await connection.execute('SELECT * FROM legal_person')
    expect(rows[0].id).toBeTruthy()
    expect(rows[0].cnpj).toBe(addLegalPersonRepositoryInput.cnpj)
    expect(rows[0].responsibleCpf).toBe(addLegalPersonRepositoryInput.responsibleCpf)
    expect(rows[0].name).toBe(addLegalPersonRepositoryInput.name)
    expect(rows[0].cellPhone).toBe(addLegalPersonRepositoryInput.cellPhone)
    expect(rows[0].phone).toBe(addLegalPersonRepositoryInput.phone)
    expect(rows[0].cep).toBe(addLegalPersonRepositoryInput.cep)
    expect(rows[0].street).toBe(addLegalPersonRepositoryInput.street)
    expect(rows[0].number).toBe(addLegalPersonRepositoryInput.number)
    expect(rows[0].complement).toBe(addLegalPersonRepositoryInput.complement)
    expect(rows[0].city).toBe(addLegalPersonRepositoryInput.city)
    expect(rows[0].neighborhood).toBe(addLegalPersonRepositoryInput.neighborhood)
    expect(rows[0].state).toBe(addLegalPersonRepositoryInput.state)
  })
})
