# ⚙️ Backend - agendaYa

Backend del proyecto **agendaYa**, una aplicación para gestión de citas en salones de belleza y barberías.  
Desarrollado con **Node.js**, **Express** y **MongoDB**.

---

## 🚀 Funcionalidades principales

- Registro y autenticación de usuarios con roles (`admin`, `user`).
- Seguridad con `bcryptjs` para el hash de contraseñas.
- Autenticación y autorización basada en JWT.
- Gestión de sesiones y cookies con `cookie-parser`.
- CRUD completo para usuarios y otros recursos.
- Subida de archivos con `multer`.
- Soporte CORS para comunicación con frontend.
- Estructura modular y escalable.

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Fabian-cyber95/agendaYa.git


---

## 🗂 Estructura general del proyecto

```
.
backend-mongodb/
├── controllers/       # Lógica y controladores
├── middlewares/       # Middlewares personalizados
├── models/            # Modelos Mongoose
├── routes/            # Definición de rutas
├── config/            # Configuración general (BD, variables)
├── uploads/           # Archivos subidos con multer
├── .env               # Variables de entorno (no subir al repo)
└── server.js          # Punto de entrada de la aplicación

```

---

📦 Dependencias principales
| Paquete       | Uso                             |
| ------------- | ------------------------------- |
| express       | Servidor HTTP                   |
| mongoose      | ODM para MongoDB                |
| bcryptjs      | Hash de contraseñas             |
| jsonwebtoken  | Autenticación JWT               |
| cookie-parser | Manejo de cookies               |
| cors          | Permite peticiones cross-origin |
| multer        | Subida de archivos              |
| dotenv        | Variables de entorno            |


---

## 🧪 Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/hdtoledo/mern-user-dashboard.git
cd proyecto-base-fullstack
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crear archivo `.env` con:

```env
PORT=5135
MONGO_URI=mongodb://localhost:27017/auth_db
```

Iniciar el backend:

```bash
npm run dev
```

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

Abre tu navegador en: `http://localhost:5173`

---

## 🔐 Datos de ejemplo

Puedes insertar usuarios manualmente en MongoDB o registrarte desde el frontend como usuario normal. Para probar el dashboard admin, crea un usuario con rol `"admin"`:

```json
{
  "nombre": "Admin",
  "correo": "admin@example.com",
  "password": "admin123",
  "rol": "admin"
}
```

---

## 🧰 Endpoints principales

| Método | Ruta                    | Descripción                  |
|--------|-------------------------|------------------------------|
| POST   | `/api/register`         | Registro de usuario          |
| POST   | `/api/login`            | Login de usuario             |
| PUT    | `/api/users/:id`        | Actualizar usuario por ID    |

---


---

## 🤝 Créditos

📫 Contacto
Desarrollado por Fabian-cyber95


🚀 Proyecto educativo, libre para modificación y mejora.

---


