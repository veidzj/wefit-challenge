import { type AddLegalPerson } from '@/domain/usecases'
import { DbAddLegalPerson } from '@/application/usecases'
import { CheckLegalPersonByCNPJMySQLRepository } from '@/infra/db/mysql/queries'
import { AddLegalPersonMySQLRepository } from '@/infra/db/mysql/commands'

export class AddLegalPersonFactory {
  public static readonly makeAddLegalPerson = (): AddLegalPerson => {
    const checkLegalPersonByCNPJRepository = new CheckLegalPersonByCNPJMySQLRepository()
    const AddLegalPersonRepository = new AddLegalPersonMySQLRepository()
    return new DbAddLegalPerson(checkLegalPersonByCNPJRepository, AddLegalPersonRepository)
  }
}
