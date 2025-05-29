import Admin from '../models/admin.js';
import multer from 'multer';
import path from 'path';

// Configurar multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique);
  },
});

export const upload = multer({ storage }).single('image');

export const uploadBusinessImage = async (req, res) => {
  try {
    const adminId = req.user._id;
    const imagePath = `/uploads/${req.file.filename}`;

    const updated = await Admin.findOneAndUpdate(
      { userId: adminId },
      { $push: { images: imagePath } },
      { new: true }
    );

    res.status(200).json({ message: 'Imagen subida', image: imagePath, business: updated });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ message: 'Error al subir imagen' });
  }
};
