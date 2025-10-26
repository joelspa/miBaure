# Archivo Baure - Cocina, Memoria y Territorio

Proyecto web para preservar la cocina y cultura del pueblo Baure de Bolivia.

![React](https://img.shields.io/badge/React-19-blue) ![Node](https://img.shields.io/badge/Node-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen) ![AI](https://img.shields.io/badge/AI-Gemini-purple)

---

## ¿Qué es esto?

Es una página web donde puedes:
- Ver recetas tradicionales del pueblo Baure
- Leer historias de vida de la comunidad
- Aprender sobre su cultura e historia
- Chatear con una IA que conoce sobre cocina tradicional

---

## Tecnologías Usadas

**Frontend (la parte visual):**
- React - para la interfaz
- Vite - para desarrollo rápido
- React Router - para navegación entre páginas
- Axios - para llamar al backend

**Backend (el servidor):**
- Node.js + Express - servidor API
- MongoDB - base de datos
- Gemini 2.0 - IA de Google para el chatbot
- Multer - para subir imágenes

---

## Cómo Instalar

### Lo que necesitas tener instalado:
- Node.js (versión 18 o mayor)
- Una cuenta en MongoDB Atlas (es gratis)
- Una API Key de Google Gemini (también gratis)

### Pasos:

1. **Clonar el repo:**
   ```bash
   git clone https://github.com/joelspa/miBaure.git
   cd miBaure
   ```

2. **Backend:**
   ```bash
   cd backend
   npm install
   ```
   
   Crear archivo `.env` con:
   ```env
   MONGODB_URI=tu_conexion_mongodb
   GEMINI_API_KEY=tu_api_key
   PORT=5000
   ADMIN_PASSWORD=admin123
   ADMIN_TOKEN=baure-admin-token
   ```

3. **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Crear archivo `.env` con:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Cargar datos de ejemplo:**
   ```bash
   cd ../backend
   node seedAll.js
   ```

5. **Iniciar todo:**
   
   En una terminal (backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   En otra terminal (frontend):
   ```bash
   cd frontend
   npm run dev
   ```

La app se abre en `http://localhost:5173`

---

## Cómo Usar

### Ver Recetas
- Entra a la página principal
- Busca por nombre o ingredientes
- Click en una receta para ver detalles

### Usar el Chatbot
- En el detalle de una receta, click en "Consulta Ancestral"
- Pregunta lo que quieras (ej: "¿cómo hacer esto vegano?")
- La IA responde con info útil

### Panel Admin
- Ve a `/admin-panel-baure`
- Password: `admin123` (o el que pusiste en `.env`)
- Desde ahí puedes crear, editar y eliminar contenido

---

## Estructura del Proyecto

```
miBaure/
├── backend/
│   ├── models/          # Schemas de MongoDB
│   ├── controllers/     # Lógica de negocio
│   ├── routes/          # Endpoints de API
│   ├── middleware/      # Auth y validaciones
│   └── server.js        # Servidor principal
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # Llamadas al API
│   │   ├── styles/      # CSS
│   │   └── App.jsx      # Componente principal
│   └── public/          # Imágenes y assets
│
└── README.md            # Este archivo
```

---

## Documentación

- **[API.md](./API.md)** - Cómo usar el API
- **[AUTENTICACION-TOKEN.md](./AUTENTICACION-TOKEN.md)** - Sistema de tokens
