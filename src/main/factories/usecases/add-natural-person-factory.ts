import { type AddNaturalPerson } from '@/domain/usecases'
import { DbAddNaturalPerson } from '@/application/usecases'
import { CheckNaturalPersonByCPFMySQLRepository } from '@/infra/db/mysql/queries'
import { AddNaturalPersonMySQLRepository } from '@/infra/db/mysql/commands'

export class AddNaturalPersonFactory {
  public static readonly makeAddNaturalPerson = (): AddNaturalPerson => {
    const checkNaturalPersonByCPFRepository = new CheckNaturalPersonByCPFMySQLRepository()
    const addNaturalPersonRepository = new AddNaturalPersonMySQLRepository()
    return new DbAddNaturalPerson(checkNaturalPersonByCPFRepository, addNaturalPersonRepository)
  }
}
