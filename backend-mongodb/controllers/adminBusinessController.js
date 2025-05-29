import Admin from '../models/admin.js';

export const updateBusiness = async (req, res) => {
  try {
    const { name, description, location, imageUrl, staff } = req.body;
    const userId = req.user._id;

    // Verificar si ya tiene un negocio
    let business = await Admin.findOne({ userId });

    if (business) {
      // ✅ Ya tiene negocio → actualizar
      business.name = name || business.name;
      business.description = description || business.description;
      business.location = location || business.location;
      business.imageUrl = imageUrl || business.imageUrl;

      // ✅ importante: actualizar staff
      if (staff) {
        business.staff = Array.isArray(staff)
          ? staff.join(', ')
          : staff;
      }

      await business.save();

      return res.status(200).json({ message: 'Negocio actualizado', business });
    } else {
      // ❌ No tiene negocio → crear uno nuevo
      const newBusiness = new Admin({
        userId,
        name,
        description,
        location,
        imageUrl,
        staff: Array.isArray(staff) ? staff.join(', ') : staff || '',
      });

      await newBusiness.save();

      return res.status(201).json({ message: 'Negocio creado exitosamente', business: newBusiness });
    }
  } catch (error) {
    console.error('Error al actualizar o crear negocio:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
