export interface AddLegalPersonRepository {
  add: (input: AddLegalPersonRepository.Input) => Promise<void>
}

export namespace AddLegalPersonRepository {
  export interface Input {
    cnpj: string
    responsibleCpf: string
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
