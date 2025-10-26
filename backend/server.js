const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const swaggerDocs = require('./config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
swaggerDocs(app);

// Conectar a MongoDB
mongoose.connect(config.mongoUri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
  .then(() => console.log('✓ Conectado a MongoDB'))
  .catch((err) => console.error('✗ Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/chat', require('./routes/ai'));
app.use('/api/life-stories', require('./routes/lifeStories'));
app.use('/api/cultural-data', require('./routes/culturalData'));


// Manejo de errores de Multer y otros
app.use((err, req, res, next) => {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'La imagen excede el tamaño máximo permitido (5MB)' });
  }
  if (err && err.message === 'Formato no permitido') {
    return res.status(400).json({ message: 'Formato de imagen no permitido' });
  }
  next(err);
});

app.get('/health', (req, res) => res.send('ok'));

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`✓ Servidor corriendo en puerto ${config.port}`);
});
