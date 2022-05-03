import { Todo } from "../models/todo.model";

const createTodo = (title: string, content: string, owner: string) => {
  return new Todo({ title, content, owner }).save()
}

const getTodosByOwner = (userId: string) => {
  return Todo.find({ owner: userId })
}

export { createTodo, getTodosByOwner }