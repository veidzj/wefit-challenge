import { MySQLHelper } from '@/infra/db/mysql/helpers'
import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'

export class CheckLegalPersonByCNPJMySQLRepository implements CheckLegalPersonByCNPJRepository {
  public readonly mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

  public async check(cnpj: string): Promise<boolean> {
    const connection = this.mySQLHelper.getConnection()
    const [result] = await connection.execute(
      'SELECT EXISTS (SELECT 1 FROM legal_person WHERE cnpj = ?) AS existsCnpj',
      [cnpj]
    )
    return Boolean(result[0].existsCnpj)
  }
}
