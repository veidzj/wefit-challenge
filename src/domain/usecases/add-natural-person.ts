import { type Address } from '@/domain/models'

export interface AddNaturalPerson {
  add: (input: AddNaturalPerson.Input) => Promise<void>
}

export namespace AddNaturalPerson {
  export interface Input {
    cpf: string
    name: string
    cellPhone: string
    phone: string
    email: string
    address: Address
  }
}
