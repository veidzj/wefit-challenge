import { MySQLRepository } from '@/infra/db/mysql/common'
import { type CheckNaturalPersonByCPFRepository } from '@/application/protocols'

export class CheckNaturalPersonByCPFMySQLRepository extends MySQLRepository implements CheckNaturalPersonByCPFRepository {
  public async check(cpf: string): Promise<boolean> {
    const connection = this.mySQLHelper.getConnection()
    const [result] = await connection.execute(
      'SELECT EXISTS (SELECT 1 FROM natural_person WHERE cpf = ?) AS existsCpf',
      [cpf]
    )
    return Boolean(result[0].existsCpf)
  }
}
