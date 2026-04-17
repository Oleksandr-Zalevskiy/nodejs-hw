import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import handlebars from 'handlebars';

import User from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import { sendEmail } from '../utils/sendMail.js';

// ... інші контролери (registerUser, loginUser, logoutUser, refreshUserSession) залишаються без змін

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: 'Password reset email sent successfully',
    });
  }

  const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const resetLink = `${process.env.FRONTEND_DOMAIN}/reset-password?token=${token}`;

  const templatePath = path.resolve('src/templates/reset-password-email.html');
  const source = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(source);

  const html = template({
    name: user.username,
    link: resetLink,
  });

  // Виправлено: явна обробка помилки відправки листа
  try {
    await sendEmail({
      to: email,
      subject: 'Reset password',
      html,
      from: process.env.SMTP_FROM,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  res.status(200).json({
    message: 'Password reset email sent successfully',
  });
};

// ... resetPassword залишається без змін
