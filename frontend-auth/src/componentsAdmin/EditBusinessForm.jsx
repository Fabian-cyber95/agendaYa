import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBusinessForm = ({ business, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    staff: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || '',
        description: business.description || '',
        location: business.location || '',
        imageUrl: business.imageUrl || '',
        staff: Array.isArray(business.staff) 
          ? business.staff.join(', ') 
          : business.staff || '',
      });
    }
  }, [business]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Limpiar errores al editar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.name.trim()) {
        throw new Error('El nombre es requerido');
      }

      const payload = {
        ...formData,
        staff: formData.staff
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      };

      await axios.put(
        'http://localhost:5000/api/businesses/my-business', 
        payload,
        { withCredentials: true }
      );

      onSuccess?.();
    } catch (err) {
      console.error('Error al actualizar:', err);
      setError(err.response?.data?.message || err.message || 'Error al actualizar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Editar Negocio</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Nombre*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ubicación</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imagen URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            type="url"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Personal (separado por comas)</label>
          <textarea
            name="staff"
            value={formData.staff}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Ej: Juan Pérez, María García"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </form>
  );
};

export default EditBusinessForm;