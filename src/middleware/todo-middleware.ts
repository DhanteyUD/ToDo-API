import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

const todoSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
})

export const todoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await todoSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err: any) {
    res.status(400).json(err.message)
  }
}
