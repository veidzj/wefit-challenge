import { type LogErrorRepository } from '@/application/protocols'

export class LogErrorRepositorySpy implements LogErrorRepository {
  public stack: string

  public async log(stack: string): Promise<void> {
    this.stack = stack
  }
}
