import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';

export const authRouter = Router();

// реєстрація користувача
authRouter.post('/register', registerController);

// логін користувача
authRouter.post('/login', loginController);

// приклад приватного маршруту
authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});
