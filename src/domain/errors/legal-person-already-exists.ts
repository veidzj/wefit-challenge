export class LegalPersonAlreadyExistsError extends Error {
  constructor() {
    super('Legal person already exists')
    this.name = this.constructor.name
  }
}
