// controllers/culturalDataController.js
const CulturalData = require('../models/CulturalData');
const { buildPublicUrl } = require('../utils/buildUrl');

// Helpers para parsear arrays compatibles con multipart/form-data
const parseMaybe = v => {
    if (Array.isArray(v)) return v;
    if (typeof v !== 'string') return v;
    try { return JSON.parse(v); } catch { return v; }
};

const toArray = v => Array.isArray(v) ? v : (typeof v === 'string' && v ? [v] : []);

// GET /api/cultural-data - Obtener todos los datos culturales
exports.getAllCulturalData = async (req, res) => {
    try {
        const data = await CulturalData.find({ deleted: false }).sort({ createdAt: -1 });
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
        const data = await CulturalData.find({ category: req.params.category, deleted: false });
        res.json(data);
    } catch (error) {
        console.error('Error al obtener datos por categoría:', error);
        res.status(500).json({ message: 'Error al obtener datos por categoría' });
    }
};

// POST /api/cultural-data - Crear nuevo dato cultural
exports.createCulturalData = async (req, res) => {
    try {
        if (!req.body.title || !req.body.title.trim()) {
            return res.status(400).json({ message: 'El campo "title" es requerido' });
        }
        if (!req.body.category) {
            return res.status(400).json({ message: 'El campo "category" es requerido' });
        }
        if (!req.body.content || !req.body.content.trim()) {
            return res.status(400).json({ message: 'El campo "content" es requerido' });
        }

        const sources = toArray(parseMaybe(req.body.sources));
        const relatedTopics = toArray(parseMaybe(req.body.relatedTopics));

        // Si hay imagen, construir URL
        const imageUrl = req.file ? buildPublicUrl(req, req.file.path) : null;
        const images = imageUrl ? [{ url: imageUrl, caption: '' }] : [];

        const culturalData = await CulturalData.create({
            title: req.body.title.trim(),
            category: req.body.category,
            content: req.body.content.trim(),
            sources,
            relatedTopics,
            images
        });

        res.status(201).json(culturalData);
    } catch (error) {
        console.error('Error al crear dato cultural:', error);
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/cultural-data/:id - Actualizar dato cultural
exports.updateCulturalData = async (req, res) => {
    try {
        const data = await CulturalData.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Dato cultural no encontrado' });

        if (req.body.title) data.title = req.body.title.trim();
        if (req.body.category) data.category = req.body.category;
        if (req.body.content) data.content = req.body.content.trim();
        
        if (req.body.sources) data.sources = toArray(parseMaybe(req.body.sources));
        if (req.body.relatedTopics) data.relatedTopics = toArray(parseMaybe(req.body.relatedTopics));
        
        if (req.file) {
            const imageUrl = buildPublicUrl(req, req.file.path);
            data.images = [{ url: imageUrl, caption: '' }];
        }

        await data.save();
        res.json(data);
    } catch (error) {
        console.error('Error al actualizar dato cultural:', error);
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/cultural-data/:id - Eliminar dato cultural (soft delete)
exports.deleteCulturalData = async (req, res) => {
    try {
        const data = await CulturalData.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Dato cultural no encontrado' });

        data.deleted = true;
        data.deletedAt = new Date();
        await data.save();

        res.json({ message: 'Dato cultural eliminado con éxito', deletedId: req.params.id });
    } catch (error) {
        console.error('Error al eliminar dato cultural:', error);
        res.status(500).json({ message: error.message });
    }
};

