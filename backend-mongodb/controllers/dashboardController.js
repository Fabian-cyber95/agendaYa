import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import path from 'path';
import multer from 'multer';

// Configuración de multer para subir imagen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Subida de avatar y actualización de perfil
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo.' });
    }

    const avatarPath = `http://localhost:5000/${req.file.path}`;
    const userId = req.user._id; // ID del usuario autenticado

    // Campos opcionales a actualizar
    const updateFields = {
      avatar: avatarPath,
    };

    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.email) updateFields.email = req.body.email;

    // Actualizar usuario
    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({
      message: 'Perfil actualizado correctamente',
      user,
    });
  } catch (error) {
    console.error('Error al subir el avatar y actualizar datos:', error);
    res.status(500).json({ message: 'Error al actualizar perfil.' });
  }
};

// Obtener citas del usuario
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointments = await Appointment.find({ userId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error);
    res.status(500).json({ message: 'Error al obtener datos del dashboard' });
  }
};

export { upload, uploadAvatar, getDashboardData };
