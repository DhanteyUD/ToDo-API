import { Request, Response, NextFunction } from 'express'
import { createTodo, getTodosByOwner } from '../repository/todo.repo'

const createTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body
  try {
    await createTodo(title, content, req.user._id)
    return res.status(201).json({ message: 'todo created' })
  } catch (err) {
    next(err)
  }
}

const getTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = getTodosByOwner(req.user._id)
    return res.status(200).json(todos)
  } catch (err) {
    next(err)
  }
}

export { createTodoController, getTodosController }
