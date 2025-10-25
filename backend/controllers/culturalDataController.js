// controllers/culturalDataController.js
const CulturalData = require('../models/CulturalData');

// GET /api/cultural-data - Obtener todos los datos culturales
exports.getAllCulturalData = async (req, res) => {
    try {
        const data = await CulturalData.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        console.error('Error al obtener datos culturales:', error);
        res.status(500).json({ message: 'Error al obtener datos culturales' });
    }
};

// GET /api/cultural-data/:id - Obtener un dato cultural específico
exports.getCulturalDataById = async (req, res) => {
    try {
        const data = await CulturalData.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Dato cultural no encontrado' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error al obtener dato cultural:', error);
        res.status(500).json({ message: 'Error al obtener dato cultural' });
    }
};

// GET /api/cultural-data/category/:category - Obtener datos por categoría
exports.getCulturalDataByCategory = async (req, res) => {
    try {
        const data = await CulturalData.find({ category: req.params.category });
        res.json(data);
    } catch (error) {
        console.error('Error al obtener datos por categoría:', error);
        res.status(500).json({ message: 'Error al obtener datos por categoría' });
    }
};
