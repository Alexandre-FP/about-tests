export class InvalidJwtError extends Error {
  constructor() {
    super('Jwt Invalid')
  }
}
