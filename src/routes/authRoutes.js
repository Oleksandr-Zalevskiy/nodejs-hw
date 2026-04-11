import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 🔧 Тут поки заглушка (потім підключиш Mongo модель)
const users = [];

// REGISTER
export const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User registered',
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' },
    );

    res.json({
      message: 'Login success',
      token,
    });
  } catch (err) {
    next(err);
  }
};
