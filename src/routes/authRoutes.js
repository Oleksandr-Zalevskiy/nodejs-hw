Давай оновимо src/routes/authRoutes.js, щоб він відповідав усім вимогам ментора. Основні моменти, які ми змінимо: додамо префікс /auth, підключимо схеми валідації через celebrate 🛡️ та виправимо імпорти (додамо .js).

Ось як має виглядати структура роутера, щоб пройти перевірку:

JavaScript
import { Router } from 'express';
import { celebrate } from 'celebrate';

// Імпортуємо всі 4 функції з правильними назвами та розширенням .js
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

// Імпортуємо схеми валідації (переконайся, що цей файл існує)
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

// 1. Реєстрація: додаємо префікс /auth та валідацію body
router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser,
);

// 2. Логін: додаємо префікс /auth та валідацію body
router.post(
  '/auth/login',
  celebrate({ body: loginUserSchema }),
  loginUser,
);

// 3. Логаут: новий маршрут з префіксом /auth
router.post('/auth/logout', logoutUser);

// 4. Рефреш: новий маршрут з префіксом /auth
router.post('/auth/refresh', refreshUserSession);

export default router;