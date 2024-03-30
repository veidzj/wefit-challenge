import { CNPJValidatorAdapter, CPFValidatorAdapter, PhoneValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'
import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  CNPJValidation,
  CPFValidation,
  PhoneValidation,
  EmailValidation,
  CepValidation
} from '@/validation/validators'

export class AddLegalPersonValidationFactory {
  public static makeAddLegalPersonValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('cnpj'))
    validations.push(new RequiredFieldValidation('responsibleCpf'))
    validations.push(new RequiredFieldValidation('name'))
    validations.push(new RequiredFieldValidation('cellPhone'))
    validations.push(new RequiredFieldValidation('phone'))
    validations.push(new RequiredFieldValidation('email'))

    validations.push(new RequiredFieldValidation('cep'))
    validations.push(new RequiredFieldValidation('street'))
    validations.push(new RequiredFieldValidation('number'))
    validations.push(new RequiredFieldValidation('complement'))
    validations.push(new RequiredFieldValidation('city'))
    validations.push(new RequiredFieldValidation('neighborhood'))
    validations.push(new RequiredFieldValidation('state'))

    validations.push(new CompareFieldsValidation('email', 'emailConfirmation'))
    validations.push(new CNPJValidation('cnpj', new CNPJValidatorAdapter()))
    validations.push(new CPFValidation('responsibleCpf', new CPFValidatorAdapter()))
    validations.push(new PhoneValidation('cellPhone', new PhoneValidatorAdapter()))
    validations.push(new PhoneValidation('phone', new PhoneValidatorAdapter()))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new CepValidation('cep'))
    return new ValidationComposite(validations)
  }
}
