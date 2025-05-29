import React, { useState } from "react";
import axios from "axios";

const CreateBusinessForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    staff: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const staffArray = form.staff.split(",").map((s) => s.trim());

      await axios.post(
        "http://localhost:5000/api/businesses/my-business",
        { ...form, staff: staffArray },
        { withCredentials: true }
      );
      setMessage("Negocio creado exitosamente ✅");
      onCreated(); // Notifica al dashboard para que recargue
    } catch (err) {
      console.error("Error al crear negocio:", err);
      setMessage("❌ Error al crear el negocio");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Crear Negocio</h3>

      <input
        type="text"
        name="name"
        placeholder="Nombre del negocio"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded text-black"
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded text-black"
      />
      <input
        type="text"
        name="location"
        placeholder="Ubicación"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded text-black"
      />
      <input
        type="text"
        name="staff"
        placeholder="Personal (separado por comas)"
        value={form.staff}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded text-black"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar negocio
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
};

export default CreateBusinessForm;
