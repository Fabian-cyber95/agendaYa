import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/businesses', {
          withCredentials: true, // Si usas cookies para autenticación
        });
        console.log('Datos recibidos:', res.data);
        setBusinesses(res.data);
      } catch (err) {
        console.error('Error al cargar los negocios:', err);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Negocios Disponibles</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {businesses.map((biz) => (
          <div
            key={biz._id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={biz.imageUrl || '/placeholder.jpg'}
              alt={biz.name}
              className="w-full h-40 object-cover rounded mb-3 transform transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-lg font-semibold">{biz.name}</h3>
            <p className="text-sm mb-2">{biz.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{biz.location}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded">
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
