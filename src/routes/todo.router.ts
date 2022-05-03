import express from 'express';
import { isAuthenticated } from '../middleware/user-middleware';
import { createTodoController, getTodosController } from '../controllers/todo.controller';
import { todoValidator } from '../middleware/todo-middleware';

const router = express.Router();

router.get('/todos', isAuthenticated, getTodosController);

router.post('/todos', isAuthenticated, todoValidator, createTodoController);

export default router;
