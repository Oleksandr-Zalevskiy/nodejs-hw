import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
