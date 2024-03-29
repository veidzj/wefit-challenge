import { AddNaturalPersonValidationFactory } from '@/main/factories/validators'
import { AddNaturalPersonFactory } from '@/main/factories/usecases'
import { type Controller } from '@/presentation/protocols'
import { AddNaturalPersonController } from '@/presentation/controllers'

export class AddNaturalPersonControllerFactory {
  public static readonly makeAddNaturalPersonController = (): Controller => {
    const controller = new AddNaturalPersonController(AddNaturalPersonValidationFactory.makeAddNaturalPersonValidation(), AddNaturalPersonFactory.makeAddNaturalPerson())
    return controller
  }
}
