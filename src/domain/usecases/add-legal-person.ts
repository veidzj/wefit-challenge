export interface AddLegalPerson {
  add: (input: AddLegalPerson.Input) => Promise<void>
}

export namespace AddLegalPerson {
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
