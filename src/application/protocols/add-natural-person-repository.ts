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
    cep: string
    street: string
    number: number
    complement: string
    city: string
    neighborhood: string
    state: string
  }
}
