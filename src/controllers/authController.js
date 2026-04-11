import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

// 1. Реєстрація користувача
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Перевірка, чи користувач вже існує
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  // Хешування пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створення користувача
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  // Створення сесії
  const session = await createSession(newUser._id);

  // Встановлення cookies
  setSessionCookies(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user: { email: newUser.email, name: newUser.name } },
  });
};

// 2. Вхід користувача
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Перевірка пароля
  const isPasswordCompare = await bcrypt.compare(password, user.password);
  if (!isPasswordCompare) {
    throw createHttpError(401, 'Unauthorized');
  }

  // Видаляємо стару сесію перед створенням нової
  await Session.deleteOne({ userId: user._id });

  // Створюємо нову сесію
  const session = await createSession(user._id);

  // Встановлюємо cookies
  setSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { user: { email: user.email } },
  });
};

// 3. Вихід (Logout)
export const logoutUser = async (req, res) => {
  if (req.cookies.sessionId) {
    await Session.deleteOne({ _id: req.cookies.sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// 4. Оновлення сесії (Refresh)
export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Session not found or expired');
  }

  // Тут має бути логіка перевірки сесії (зазвичай у сервісах)
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session || new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token expired or invalid');
  }

  // Видаляємо стару та створюємо нову
  await Session.deleteOne({ _id: sessionId });
  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};
