import { MySQLRepository } from '@/infra/db/mysql/common'
import { type AddNaturalPersonRepository } from '@/application/protocols'

export class AddNaturalPersonMySQLRepository extends MySQLRepository implements AddNaturalPersonRepository {
  public async add(input: AddNaturalPersonRepository.Input): Promise<void> {
    const connection = this.mySQLHelper.getConnection()
    await connection.execute(
      'INSERT INTO natural_person (cpf, name, cellPhone, phone, email, cep, street, number, complement, city, neighborhood, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [input.cpf, input.name, input.cellPhone, input.phone, input.email, input.cep, input.street, input.number, input.complement, input.city, input.neighborhood, input.state]
    )
  }
}
