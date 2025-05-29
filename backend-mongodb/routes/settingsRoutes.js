import express from 'express';
import Settings from '../models/settings.js';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Importación nombrada correcta

const router = express.Router();

// Obtener configuración del usuario autenticado
router.get('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener configuración', error: err.message });
  }
});

// Actualizar configuración completa
router.put('/', protect, async (req, res) => {
  try {
    const updated = await Settings.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ message: 'Configuración actualizada', settings: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar configuración', error: err.message });
  }
});

// Alternar vinculación de red social
router.put('/link/:platform', protect, async (req, res) => {
  const { platform } = req.params;
  const validPlatforms = ['google', 'facebook', 'twitter'];
  if (!validPlatforms.includes(platform)) {
    return res.status(400).json({ message: 'Plataforma no válida' });
  }

  try {
    let settings = await Settings.findOne({ userId: req.user.id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id });
    }

    const currentStatus = settings.linkedAccounts[platform];
    settings.linkedAccounts[platform] = !currentStatus;
    await settings.save();

    res.json({ message: `${platform} actualizado`, linkedAccounts: settings.linkedAccounts });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar red social', error: err.message });
  }
});

export default router;
