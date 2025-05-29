import express from 'express';
import Admin from '../models/admin.js';
import { updateBusiness } from '../controllers/adminBusinessController.js';
import { upload, uploadBusinessImage } from '../controllers/uploadImage.js';
import { protect } from '../middleware/authMiddleware.js'; // asegúrate de tener este middleware

const router = express.Router();

// GET: Obtener todos los negocios
router.get('/', async (req, res) => {
  try {
    const businesses = await Admin.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener negocios' });
  }
});

router.post('/upload-image', protect, upload, uploadBusinessImage);

// POST: Crear un nuevo negocio (opcional si solo usas el PUT de my-business)
router.post('/', async (req, res) => {
  try {
    const { name, description, location, imageUrl } = req.body;
    const newBusiness = new Admin({
      name,
      description,
      location,
      imageUrl,
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el negocio' });
  }
});

// ✅ PUT: Crear o actualizar el negocio del usuario autenticado
router.put('/my-business', protect, updateBusiness);

export default router;
