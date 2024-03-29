import { MySQLHelper } from '@/infra/db/mysql/helpers'

const mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

export async function connectToDatabase(): Promise<void> {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_db'
  }
  await mySQLHelper.connect(config)
}

export async function disconnectFromDatabase(): Promise<void> {
  await mySQLHelper.disconnect()
}

export async function clearTable(tableName: string): Promise<void> {
  await mySQLHelper.clearTable(tableName)
}
