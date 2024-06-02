import { randomUUID } from 'crypto'
import { UsersProxy } from '../users-proxy'
import { Prisma, User } from '@prisma/client'

export class InMemoryUsersRepository implements UsersProxy {
  private items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
