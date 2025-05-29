// tests/authController.test.js
import { login } from '../controllers/authController.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('login controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: 'test@example.com', password: '123456' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  test('should return 400 if email or password is missing', async () => {
    req.body = { email: '', password: '' };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todos los campos son obligatorios' });
  });

  test('should return 401 if user not found or password is incorrect', async () => {
    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Correo o password incorrecto!' });
  });

  test('should return 200 and set cookie if login is successful', async () => {
    const fakeUser = { _id: 'user123', password: 'hashedpass' };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-token');

    await login(req, res);

    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      'fake-token',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: expect.any(Number),
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login exitoso',
      user: fakeUser,
    });
  });

  test('should handle server errors', async () => {
    User.findOne.mockRejectedValue(new Error('DB error'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error en el servidor' });
  });
});
