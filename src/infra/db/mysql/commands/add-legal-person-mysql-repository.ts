import { MySQLRepository } from '@/infra/db/mysql/common'
import { type AddLegalPersonRepository } from '@/application/protocols'

export class AddLegalPersonMySQLRepository extends MySQLRepository implements AddLegalPersonRepository {
  public async add(input: AddLegalPersonRepository.Input): Promise<void> {
    const connection = this.mySQLHelper.getConnection()
    await connection.execute(
      'INSERT INTO legal_person (cnpj, responsibleCpf, name, cellPhone, phone, email, cep, street, number, complement, city, neighborhood, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [input.cnpj, input.responsibleCpf, input.name, input.cellPhone, input.phone, input.email, input.cep, input.street, input.number, input.complement, input.city, input.neighborhood, input.state]
    )
  }
}
