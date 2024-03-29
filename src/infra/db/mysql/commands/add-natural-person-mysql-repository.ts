import { MySQLHelper } from '@/infra/db/mysql/helpers'
import { type AddNaturalPersonRepository } from '@/application/protocols'

export class AddNaturalPersonMySQLRepository implements AddNaturalPersonRepository {
  public readonly mySQLHelper: MySQLHelper = MySQLHelper.getInstance()

  public async add(input: AddNaturalPersonRepository.Input): Promise<void> {
    const connection = this.mySQLHelper.getConnection()
    await connection.execute(
      'INSERT INTO natural_person (cpf, name, cellPhone, phone, email, cep, street, number, complement, city, neighborhood, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [input.cpf, input.name, input.cellPhone, input.phone, input.email, input.address.cep, input.address.street, input.address.number, input.address.complement, input.address.city, input.address.neighborhood, input.address.state]
    )
  }
}
