import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { verifyToken, Token } from '../utils/'

const authSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err: any) {
    res.status(400).json(err.message)
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization
    const token = header?.split('Bearer ')[1]

    if (!token) return res.status(400).json({ message: 'invalid token' })

    const user = verifyToken(token) as Token
    req.user = user
    next()
  } catch (err: any) {
    res.status(400).json({ message: 'invalid token' })
  }
}
