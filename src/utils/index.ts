import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface Token {
  _id: string
}

const secret = process.env.SECRET as string

const hashPassword = async (password: string) => {
  const salt = process.env.SALT_ROUNDS as string
  return bcrypt.hash(password, salt)
}

const comparePasswords = (plainText: string, hash: string) => {
  return bcrypt.compare(plainText, hash)
}

const getToken = (details: Token) => {
  return jwt.sign(details, secret)
}

const verifyToken = (token: string) => {
  return jwt.verify(token, secret)
}

export { hashPassword, comparePasswords, getToken, verifyToken }
