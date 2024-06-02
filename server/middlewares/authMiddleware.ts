import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../env'
import { InvalidJwtError } from '../use-cases/errors/invalid-jwt-error'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new InvalidJwtError()
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, env.JWT_SECRET)

    return next()
  } catch {
    throw new InvalidJwtError()
  }
}
