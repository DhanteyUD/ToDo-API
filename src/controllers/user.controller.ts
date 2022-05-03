import { Request, Response, NextFunction } from 'express'
import { createUser, findUserByUsername } from '../repository/user.repo'
import { hashPassword, comparePasswords, getToken } from '../utils/'

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body

  try {
    const existingUser = await findUserByUsername(username)
    if (existingUser != null) {
      return res.status(409).json({ message: 'username already taken' })
    }

    const hashedPassword = await hashPassword(password)
    await createUser(username, hashedPassword)
    return res.status(201).json({ message: 'user created' })
  } catch (err) {
    next(err)
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  try {
    const existingUser = await findUserByUsername(username)
    if (existingUser == null) {
      return res.status(400).json({ message: 'invalid username or password' })
    }

    const result = await comparePasswords(password, existingUser.password)
    if (!result) {
      return res.status(400).json({ message: 'invalid username or password' })
    }

    const token = getToken({ _id: existingUser._id })
    return res.status(200).json({ user: existingUser, token })
  } catch (err) {
    next(err)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {}

export { registerUser, loginUser, getUser }
