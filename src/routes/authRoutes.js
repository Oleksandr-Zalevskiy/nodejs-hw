import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

import { authenticate } from '../middleware/authenticate.js';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh', refreshUserSession);

authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
