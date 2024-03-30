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
    cep: string
    street: string
    number: number
    complement: string
    city: string
    neighborhood: string
    state: string
  }
}
