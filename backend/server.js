// index.js (o server.js)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite peticiones del frontend
app.use(express.json()); // Permite al servidor leer JSON

// Conectar a MongoDB con configuración de timeouts
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30 segundos para seleccionar servidor
    socketTimeoutMS: 45000, // 45 segundos para operaciones de socket
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas
const recipesRouter = require('./routes/recipes');
app.use('/api/recipes', recipesRouter); // URL base: http://localhost:5000/api/recipes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));