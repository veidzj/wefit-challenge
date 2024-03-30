import { type CheckLegalPersonByCNPJRepository } from '@/application/protocols'

export class CheckLegalPersonByCNPJRepositorySpy implements CheckLegalPersonByCNPJRepository {
  public cnpj: string
  public output: boolean = false

  public async check(cnpj: string): Promise<boolean> {
    this.cnpj = cnpj
    return this.output
  }
}
