import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      const userData = res.data.user;
      console.log("Usuario autenticado:", userData);

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.rol === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-center mb-4 font-bold">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Ingresa el Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-gray-600 mt-4">
            ¿No tienes cuenta?
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Regístrate
            </a>
          </p>

          <p className="text-center text-gray-600 mt-4">
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Regresar al Home
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
