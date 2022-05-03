import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/user.controller';
import { isAuthenticated, authValidation } from '../middleware/user-middleware';

const router = express.Router();

router.post('/register', authValidation, registerUser)

router.post('/login', authValidation, loginUser)

router.get('/', getUser)