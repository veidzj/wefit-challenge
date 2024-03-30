import { AddLegalPersonValidationFactory } from '@/main/factories/validators'
import { AddLegalPersonFactory } from '@/main/factories/usecases'
import { type Controller } from '@/presentation/protocols'
import { AddLegalPersonController } from '@/presentation/controllers'

export class AddLegalPersonControllerFactory {
  public static readonly makeAddLegalPersonController = (): Controller => {
    const controller = new AddLegalPersonController(AddLegalPersonValidationFactory.makeAddLegalPersonValidation(), AddLegalPersonFactory.makeAddLegalPerson())
    return controller
  }
}
