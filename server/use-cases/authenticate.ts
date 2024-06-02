import { UsersProxy } from '../repositories/users-proxy'
import { InvalidCrendentialsError } from './errors/invalid-crendentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password_hash: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  // lidando com regras de negocios
  constructor(private usersRepository: UsersProxy) {}

  async execute({
    email,
    password_hash,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCrendentialsError()
    }

    const doesPasswordMatchs = await compare(password_hash, user.password)

    if (!doesPasswordMatchs) {
      throw new InvalidCrendentialsError()
    }

    return {
      user,
    }
  }
}
