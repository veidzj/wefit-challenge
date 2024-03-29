import { type Address } from '@/domain/models'

export interface AddNaturalPersonRepository {
  add: (input: AddNaturalPersonRepository.Input) => Promise<void>
}

export namespace AddNaturalPersonRepository {
  export interface Input {
    cpf: string
    name: string
    cellPhone: string
    phone: string
    email: string
    address: Address
  }
}
