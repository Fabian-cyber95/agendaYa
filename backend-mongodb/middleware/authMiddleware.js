import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Se obtiene desde cookies

    console.log('Cookies recibidas:', req.cookies);
    console.log('Token recibido en middleware:', token);

    if (!token) {
      return res.status(401).json({ message: 'No autorizado. Token no encontrado en cookies.' });
    }

    // ✅ Intentar verificar el token con `jwt.verify()`
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded);
      
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      next();
    } catch (error) {
      console.error('Error en jwt.verify:', error.message);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

  } catch (error) {
    console.error('Error general en authMiddleware:', error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export { protect };
