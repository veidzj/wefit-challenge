import { MySQLHelper } from '@/infra/db/mysql/helpers'

describe('MySQLHelper', () => {
  test('Should throw if connection on getConnection is null', () => {
    const mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

    expect(() => {
      mySQLHelper.getConnection()
    }).toThrow()
  })
})
