import { User } from '../models/user.model'

const findUserByUsername = (username: string) => {
  return User.findOne({ username })
}

const createUser = (username: string, password: string) => {
  return new User({ username, password }).save()
}

export { findUserByUsername, createUser }
