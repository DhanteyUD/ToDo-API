import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
})

const Todo = model('Todo', todoSchema)

export { Todo }