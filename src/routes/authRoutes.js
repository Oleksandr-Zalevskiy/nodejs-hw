import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';

import { authenticate } from '../middleware/authenticate.js';

const authRouter = Router();

// register
authRouter.post('/register', registerController);

// login
authRouter.post('/login', loginController);

// protected route
authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
