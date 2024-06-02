import { Prisma } from '@prisma/client'
import { prisma } from '../../db/prisma'
import { UsersProxy } from '../users-proxy'

export class PrismaUserRepository implements UsersProxy {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
