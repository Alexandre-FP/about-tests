import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersProxy } from '../repositories/users-proxy'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

interface RegisterUseCaseRequest {
  email: string
  password_hash: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersProxy) {}

  async execute({
    email,
    password_hash,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password = await hash(password_hash, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const user = await this.usersRepository.create({
      email,
      password,
    })

    return {
      user,
    }
  }
}
