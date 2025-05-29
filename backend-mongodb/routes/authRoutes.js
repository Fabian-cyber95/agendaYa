import express from 'express';
import { login } from '../controllers/authController.js';
import { register } from '../controllers/registerController.js';
import { getAllUsers, deleteUser, updateUser } from '../controllers/adminController.js';

const router = express.Router();

// Login y registro
router.post('/login', login);
router.post('/register', register);

// Admin - gestión de usuarios
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

// ✅ Cierre de sesión
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

export default router;
