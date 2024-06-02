import { z } from 'zod'
import { Request, Response } from 'express'
import { UserAlreadyExistError } from '../../use-cases/errors/user-already-exist-error'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'

export async function register(request: Request, res: Response) {
  // camada para lidar como requisição e resposta
  const registerBodySchema = z.object({
    email: z.string().email(),
    password_hash: z.string(),
  })

  const { email, password_hash } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      password_hash,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return res.status(409).json({ message: err.message })
    }

    throw err
  }

  return res.status(201).json()
}
