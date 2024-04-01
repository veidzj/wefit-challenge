import { MySQLRepository } from '@/infra/db/mysql/common'
import { type LogErrorRepository } from '@/application/protocols'

export class LogErrorMySQLRepository extends MySQLRepository implements LogErrorRepository {
  public async log(stack: string): Promise<void> {
    const connection = this.mySQLHelper.getConnection()
    await connection.execute(
      'INSERT INTO errors (stack, date) VALUES (?, ?)',
      [stack, new Date()]
    )
  }
}
