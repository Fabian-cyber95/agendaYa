import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5000/api/businesses/upload-image", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("✅ Imagen subida correctamente");
      onUploaded(); // recarga info
    } catch (err) {
      console.error("Error al subir imagen:", err);
      setStatus("❌ Error al subir imagen");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4">Subir Imagen del Negocio</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
        accept="image/*"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Subir Imagen
      </button>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </form>
  );
};

export default ImageUploadForm;
