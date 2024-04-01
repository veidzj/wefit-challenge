import { LogErrorDecorator } from '@/main/decorators'
import { type Controller } from '@/presentation/protocols'
import { LogErrorMySQLRepository } from '@/infra/db/mysql/commands'

export const makeLogErrorDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogErrorMySQLRepository()
  return new LogErrorDecorator(controller, logErrorRepository)
}
