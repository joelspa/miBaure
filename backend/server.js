const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('✓ Conectado a MongoDB'))
    .catch((err) => console.error('✗ Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/chat', require('./routes/ai'));
app.use('/api/life-stories', require('./routes/lifeStories'));
app.use('/api/cultural-data', require('./routes/culturalData'));

// Iniciar servidor
app.listen(config.port, () => console.log(`✓ Servidor corriendo en puerto ${config.port}`));