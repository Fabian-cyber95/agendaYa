// controllers/userController.js
export const getUserProfile = async (req, res) => {
    try {
      const user = req.user; // gracias al middleware "protect"
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    } catch (error) {
      console.error('❌ Error al obtener el perfil del usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  