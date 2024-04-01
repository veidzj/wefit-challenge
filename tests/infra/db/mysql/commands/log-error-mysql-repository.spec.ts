import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearTable } from '@/tests/infra/db/mysql'
import { LogErrorMySQLRepository } from '@/infra/db/mysql/commands'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

describe('LogErrorMySQLRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  afterEach(async() => {
    await clearTable('errors')
  })

  test('Should add an error log on success', async() => {
    const mySQLHelper = MySQLHelper.getInstance()
    const connection = mySQLHelper.getConnection()
    const sut = new LogErrorMySQLRepository()
    const stack = faker.word.words()

    await sut.log(stack)

    const [rows] = await connection.execute('SELECT * FROM errors')
    expect(rows[0].id).toBeTruthy()
    expect(rows[0].stack).toBe(stack)
    expect(rows[0].date).toBeTruthy()
  })
})
