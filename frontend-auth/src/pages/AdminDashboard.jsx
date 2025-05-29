import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserTie, FaPlus, FaEdit, FaImage, FaHome, FaSync } from "react-icons/fa";
import axios from "axios";
import BusinessView from "../componentsAdmin/BusinessView";
import CreateBusinessForm from "../componentsAdmin/CreateBusinessForm";
import EditBusinessForm from "../componentsAdmin/EditBusinessForm";
import ImageUploadForm from "../componentsAdmin/ImageUploadForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.rol !== "admin") {
        navigate("/login");
        return;
      }

      setUser(storedUser);
      await loadBusinessData();
    };

    loadData();
  }, [navigate, lastUpdate]); // Se ejecuta cuando cambia lastUpdate

  const loadBusinessData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/businesses", {
        withCredentials: true,
      });
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const myBusiness = res.data.find((b) => b.userId === userId);
      setBusiness(myBusiness || null);
    } catch (err) {
      console.error("Error al cargar negocio:", err);
      setError("Error al cargar los datos del negocio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOperationSuccess = () => {
    setLastUpdate(new Date()); // Esto disparará la recarga automática
    setActiveView("dashboard"); // Volver a la vista principal
  };

  const handleManualRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { 
        withCredentials: true 
      });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  // Estilos reutilizables
  const menuItemStyle = (isActive) => 
    `flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${isActive ? 
     'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-inner' : 
     'hover:bg-gray-100 dark:hover:bg-gray-700'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Sidebar elegante */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <FaUserTie className="text-blue-600 dark:text-blue-300 text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Panel Admin</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.nombre || user?.name}
            </p>
          </div>
        </div>

        <nav className="p-4">
          <button
            onClick={() => setActiveView("dashboard")}
            className={menuItemStyle(activeView === "dashboard")}
          >
            <FaHome className="text-lg" />
            <span>Dashboard</span>
          </button>

          {!business ? (
            <button
              onClick={() => setActiveView("create")}
              className={menuItemStyle(activeView === "create")}
            >
              <FaPlus className="text-lg" />
              <span>Crear Negocio</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setActiveView("edit")}
                className={menuItemStyle(activeView === "edit")}
              >
                <FaEdit className="text-lg" />
                <span>Editar Negocio</span>
              </button>

              <button
                onClick={() => setActiveView("image")}
                className={menuItemStyle(activeView === "image")}
              >
                <FaImage className="text-lg" />
                <span>Imágenes</span>
              </button>
            </>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleManualRefresh}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all w-full"
            >
              <FaSync className="text-lg" />
              <span>Actualizar Datos</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-all w-full mt-2"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Contenido principal con animación */}
      <div className="ml-64 p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Encabezado con gradiente */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {activeView === "dashboard" && "Resumen del Negocio"}
                {activeView === "create" && "Nuevo Negocio"}
                {activeView === "edit" && "Editar Negocio"} 
                {activeView === "image" && "Gestión de Imágenes"}
              </h1>
              {business && activeView === "dashboard" && (
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Última actualización: {new Date(lastUpdate).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Contenido con skeleton loading */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-6"></div>
              </div>
            ) : (
              <>
                {activeView === "dashboard" && <BusinessView business={business} />}

                {activeView === "create" && (
                  <CreateBusinessForm 
                    onCreated={handleOperationSuccess}
                    onCancel={() => setActiveView("dashboard")}
                  />
                )}

                {activeView === "edit" && business && (
                  <EditBusinessForm 
                    business={business}
                    onUpdated={handleOperationSuccess}
                    onCancel={() => setActiveView("dashboard")}
                  />
                )}

                {activeView === "image" && business && (
                  <ImageUploadForm 
                    onUploaded={handleOperationSuccess}
                    onCancel={() => setActiveView("dashboard")}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;