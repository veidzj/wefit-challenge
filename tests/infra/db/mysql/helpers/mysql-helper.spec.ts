import { MySQLHelper } from '@/infra/db/mysql/helpers'
import { faker } from '@faker-js/faker'

describe('MySQLHelper', () => {
  test('Should throw if connection on getConnection is null', () => {
    const mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

    expect(() => {
      mySQLHelper.getConnection()
    }).toThrow()
  })

  test('Should throw if connection on clearTable is null', async() => {
    const mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

    const promise = mySQLHelper.clearTable(faker.word.words())

    await expect(promise).rejects.toThrow()
  })
})
