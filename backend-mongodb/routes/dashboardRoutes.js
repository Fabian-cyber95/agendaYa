import express from 'express';
import { getDashboardData, upload, uploadAvatar } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile } from '../controllers/userController.js';
import User from '../models/User.js';

const router = express.Router();

// 🟢 Ruta para actualizar el perfil (avatar, nombre y correo)
router.put('/profile', protect, upload.single('avatar'), async (req, res) => {
  console.log("🔑 Usuario autenticado:", req.user);
  console.log("📥 Datos recibidos:", req.body);

  try {
    const { name, email } = req.body;
    const avatarPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.user.avatar;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, avatar: avatarPath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



// 🟢 Ruta para obtener el perfil del usuario autenticado
router.get('/user-profile', protect, getUserProfile);

// 🟢 Ruta opcional para solo subir el avatar (si se usara aparte)
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);

// 🟢 Ruta para obtener las citas del dashboard
router.get('/', protect, getDashboardData);

export default router;

