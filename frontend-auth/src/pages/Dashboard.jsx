import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Appointments from '../components/Appointments';
import Statistics from '../components/Statistics';
import Businesses from '../components/Businesses';
import Settings from '../components/Settings';
import LogoutButton from '../components/LogoutButton'; // ✅ Este componente ya incluye el handler
import { FaUser, FaCalendarAlt, FaChartBar, FaCog, FaStore } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings', {
          withCredentials: true,
        });
        setDarkMode(res.data.darkMode || false);
      } catch (err) {
        console.error('Error al cargar configuración:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleTheme = async () => {
    const updated = !darkMode;
    setDarkMode(updated);
    try {
      await axios.put(
        'http://localhost:5000/api/settings',
        { darkMode: updated },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Error al guardar darkMode:', err);
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Menú lateral */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white flex flex-col`}>
        <h2 className="text-2xl font-bold p-4 border-b border-blue-500">
          Mi Dashboard
        </h2>
        <nav className="flex flex-col p-4 space-y-2">
          <button
            className={`${activeSection === 'profile' ? 'bg-blue-700' : ''} p-2 rounded text-left hover:bg-blue-500 flex items-center`}
            onClick={() => setActiveSection('profile')}
          >
            <FaUser className="mr-2" /> Mi Perfil
          </button>
          <button
            className={`${activeSection === 'appointments' ? 'bg-blue-700' : ''} p-2 rounded text-left hover:bg-blue-500 flex items-center`}
            onClick={() => setActiveSection('appointments')}
          >
            <FaCalendarAlt className="mr-2" /> Citas
          </button>
          <button
            className={`${activeSection === 'businesses' ? 'bg-blue-700' : ''} p-2 rounded text-left hover:bg-blue-500 flex items-center`}
            onClick={() => setActiveSection('businesses')}
          >
            <FaStore className="mr-2" /> Negocios
          </button>
          <button
            className={`${activeSection === 'statistics' ? 'bg-blue-700' : ''} p-2 rounded text-left hover:bg-blue-500 flex items-center`}
            onClick={() => setActiveSection('statistics')}
          >
            <FaChartBar className="mr-2" /> Estadísticas
          </button>
          <button
            className={`${activeSection === 'settings' ? 'bg-blue-700' : ''} p-2 rounded text-left hover:bg-blue-500 flex items-center`}
            onClick={() => setActiveSection('settings')}
          >
            <FaCog className="mr-2" /> Configuración
          </button>

          {/* Botón para cambiar tema */}
          <button
            onClick={toggleTheme}
            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Cambiar a tema {darkMode ? 'claro' : 'oscuro'}
          </button>

          {/* ✅ Botón de cerrar sesión como componente */}
          <div className="mt-2">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Sección principal */}
      <main className="flex-1 p-6">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {activeSection === 'profile' && <Profile />}
          {activeSection === 'appointments' && <Appointments />}
          {activeSection === 'businesses' && <Businesses />}
          {activeSection === 'statistics' && <Statistics />}
          {activeSection === 'settings' && <Settings />}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
