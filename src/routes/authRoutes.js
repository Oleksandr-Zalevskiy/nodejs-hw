import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';

const authRouter = Router();

// реєстрація
authRouter.post('/register', registerController);

// логін
authRouter.post('/login', loginController);

// перевірка авторизації
authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
