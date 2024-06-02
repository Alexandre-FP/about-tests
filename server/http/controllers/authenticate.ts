import { z } from 'zod'
import { Request, Response } from 'express'
import { InvalidCrendentialsError } from '../../use-cases/errors/invalid-crendentials-error'
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case'
import { sign } from 'jsonwebtoken'
import { env } from '../../env'
import _ from 'lodash'

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password_hash: z.string(),
  })

  const { email, password_hash } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const userAuthenticate = await authenticateUseCase.execute({
      email,
      password_hash,
    })

    const token = sign({ session: userAuthenticate }, env.JWT_SECRET, {
      subject: String(userAuthenticate),
      expiresIn: 60 * 60,
    })

    return res.status(200).json({ token })
  } catch (err) {
    if (err instanceof InvalidCrendentialsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }
}
