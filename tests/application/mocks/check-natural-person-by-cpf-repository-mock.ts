import { type CheckNaturalPersonByCPFRepository } from '@/application/protocols'

export class CheckNaturalPersonByCPFRepositorySpy implements CheckNaturalPersonByCPFRepository {
  public cpf: string
  public output: boolean = false

  public async check(cpf: string): Promise<boolean> {
    this.cpf = cpf
    return this.output
  }
}
