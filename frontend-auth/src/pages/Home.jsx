import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-b from-[#1E1E2E] to-[#2C3E50] text-gray-300" // Tema oscuro
          : "bg-[#C3F2C2] text-[#333333]" // Tema claro con un fondo cálido
      } flex flex-col items-center justify-center px-4`}
    >
      {/* Botón para alternar el tema */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 px-4 py-2 rounded-lg font-medium ${
          darkMode
            ? "bg-blue-700 text-white hover:bg-blue-600" // Botón para tema oscuro
            : "bg-gray-800 text-white hover:bg-gray-700" // Botón para tema claro
        } transition`}
      >
        {darkMode ? "Tema Claro" : "Tema Oscuro"}
      </button>

      {/* Encabezado */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-yellow-400">agendaYA!</h1>
        <nav className="space-x-2">
          <Link
            to="/login"
            className="inline-block px-5 py-2 bg-white text-blue-600 border border-blue-600 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 dark:bg-blue-500 transition"
          >
            Registrarse
          </Link>
        </nav>
      </header>

      {/* Sección principal */}
      <main className="flex-1 w-full max-w-3xl text-center py-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Bienvenido a <span className="text-blue-600 dark:text-yellow-400">agendaYA!</span>
        </motion.h2>
        <p className="mb-8">
          agendaYA! es la solución perfecta para gestionar tus citas de manera rápida, fácil y eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 transition text-base font-semibold"
          >
            Empezar
          </Link>
          <a
            href="#features"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-lightBg hover:text-blue-600 dark:hover:bg-yellow-400 dark:hover:text-white transition text-base font-semibold"
          >
            Ver más
          </a>
        </div>
      </main>

      {/* Ventajas */}
      <section id="features" className="w-full max-w-4xl py-16 text-center">
        <h3 className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mb-6">Ventajas</h3>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <FaCalendarAlt className="text-blue-600 dark:text-yellow-400 text-3xl mb-4" />
            <h4 className="font-semibold mb-2">Simplicidad y comodidad</h4>
            <p>Agendar tu cita es rápido y fácil.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <FaClock className="text-blue-600 dark:text-yellow-400 text-3xl mb-4" />
            <h4 className="font-semibold mb-2">Optimización del tiempo</h4>
            <p>Gestiona tus citas de manera eficiente.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <FaCheckCircle className="text-blue-600 dark:text-yellow-400 text-3xl mb-4" />
            <h4 className="font-semibold mb-2">Recordatorios automáticos</h4>
            <p>No olvides tus citas nunca más.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-600 dark:text-gray-400 py-6">
        © {new Date().getFullYear()} agendaYA. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
