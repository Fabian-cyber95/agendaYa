import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLanguage, FaBell, FaLink } from 'react-icons/fa';

const Settings = () => {
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState(true);
  const [linkedAccounts, setLinkedAccounts] = useState({
    google: false,
    facebook: false,
    twitter: false,
  });

  // Cargar configuración desde backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings', {
          withCredentials: true,
        });
        const data = res.data;
        setLanguage(data.language || 'es');
        setNotifications(data.notifications ?? true);
        setLinkedAccounts(data.linkedAccounts || {
          google: false,
          facebook: false,
          twitter: false,
        });
      } catch (err) {
        console.error('Error al cargar configuración:', err);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async (updates) => {
    try {
      await axios.put('http://localhost:5000/api/settings', updates, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Error al guardar configuración:', err);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    saveSettings({ language: selectedLang });
  };

  const toggleNotifications = () => {
    const updated = !notifications;
    setNotifications(updated);
    saveSettings({ notifications: updated });
  };

  const toggleSocialLink = async (platform) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/settings/link/${platform}`,
        {},
        { withCredentials: true }
      );
      setLinkedAccounts(res.data.linkedAccounts);
    } catch (err) {
      console.error(`Error al actualizar ${platform}:`, err);
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Configuración</h2>

      {/* Idioma */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 w-full max-w-md">
        <div className="flex items-center mb-2">
          <FaLanguage className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Idioma</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selecciona el idioma de la interfaz.</p>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded p-2"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </section>

      {/* Notificaciones */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 w-full max-w-md">
        <div className="flex items-center mb-2">
          <FaBell className="text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notificaciones</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Activa o desactiva las notificaciones por correo.</p>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700 dark:text-gray-200">
            {notifications ? 'Activadas' : 'Desactivadas'}
          </span>
        </label>
      </section>

      {/* Redes Sociales */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-md">
        <div className="flex items-center mb-2">
          <FaLink className="text-green-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Redes Sociales Vinculadas</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Gestiona tus conexiones a redes sociales.</p>
        <div className="space-y-2">
          {['google', 'facebook', 'twitter'].map((platform) => (
            <button
              key={platform}
              onClick={() => toggleSocialLink(platform)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {linkedAccounts[platform]
                ? `Desvincular ${platform}`
                : `Vincular ${platform}`}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
