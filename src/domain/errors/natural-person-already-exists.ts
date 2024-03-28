export class NaturalPersonAlreadyExistsError extends Error {
  constructor() {
    super('Natural person already exists')
    this.name = this.constructor.name
  }
}
