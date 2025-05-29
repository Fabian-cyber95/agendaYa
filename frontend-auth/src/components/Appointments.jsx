import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/dashboard'); // Usa tu endpoint real
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    setLoading(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date }),
      });

      if (response.ok) {
        setTitle('');
        setDate('');
        fetchAppointments(); // Recargar citas
      } else {
        console.error('Error al guardar la cita');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">🗓 Tus Citas</h2>

      {/* Formulario para nueva cita */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Ej. Consulta médica"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Fecha</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? 'Reservando...' : 'Reservar Cita'}
        </button>
      </form>

      {/* Lista de citas existentes */}
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold">{appointment.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(appointment.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No tienes citas registradas.
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
