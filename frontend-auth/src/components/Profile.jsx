import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/user-profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('No autenticado');

        const data = await response.json();
        console.log('Perfil recibido:', data);
        setProfileData(data);
      } catch (error) {
        console.error('Error al obtener perfil:', error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      setNewAvatarFile(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      if (newAvatarFile) {
        formData.append('avatar', newAvatarFile);
      }

      const response = await fetch('http://localhost:5000/api/dashboard/profile', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error('Error al guardar el perfil');
      }

      const data = await response.json();
      setProfileData(data.user);
      setIsEditing(false);
      setNewAvatarFile(null);
      console.log('Perfil actualizado correctamente:', data.user);
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <img
          src={profileData.avatar || 'http://localhost:5000/uploads/default-avatar.png'}
          alt="Avatar"
          className="rounded-full w-32 h-32 border-4 border-blue-500 mb-4"
        />
       <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
  {profileData.name || "Cargando..."}
</h2>

        <p className="text-gray-600">{profileData.email || "Cargando..."}</p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          onClick={handleEditToggle}
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>

        {isEditing && (
          <div className="mt-4 w-full">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={profileData.name || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />

            <label className="block text-gray-700 mt-4">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={profileData.email || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            />

            <label className="block text-gray-700 mt-4">Cambiar Foto de Perfil:</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full border rounded p-2 mt-1"
            />

            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
              onClick={handleSave}
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
