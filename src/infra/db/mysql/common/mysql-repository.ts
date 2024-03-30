import { MySQLHelper } from '@/infra/db/mysql/helpers'

export class MySQLRepository {
  public readonly mySQLHelper: MySQLHelper = MySQLHelper.getInstance()
}
