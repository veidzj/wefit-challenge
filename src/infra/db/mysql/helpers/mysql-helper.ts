import mysql, { type Connection } from 'mysql2/promise'

export class MySQLHelper {
  private static instance: MySQLHelper
  private connection: Connection | null = null

  private constructor() {}

  public static getInstance(): MySQLHelper {
    if (!MySQLHelper.instance) {
      MySQLHelper.instance = new MySQLHelper()
    }
    return MySQLHelper.instance
  }

  public async connect(config: mysql.ConnectionOptions): Promise<void> {
    this.connection = await mysql.createConnection(config)
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end()
      this.connection = null
    }
  }

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('No active connection to the database')
    }
    return this.connection
  }

  public async clearTable(tableName: string): Promise<void> {
    if (!this.connection) {
      throw new Error('No active connection to the database')
    }
    await this.connection.execute(`TRUNCATE TABLE ${tableName}`)
  }
}
