// controllers/lifeStoryController.js
const LifeStory = require('../models/LifeStory');

// GET /api/life-stories - Obtener todos los recuentos de vida
exports.getAllLifeStories = async (req, res) => {
    try {
        const stories = await LifeStory.find().sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        console.error('Error al obtener recuentos de vida:', error);
        res.status(500).json({ message: 'Error al obtener recuentos de vida' });
    }
};

// GET /api/life-stories/:id - Obtener un recuento específico
exports.getLifeStoryById = async (req, res) => {
    try {
        const story = await LifeStory.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Recuento no encontrado' });
        }
        res.json(story);
    } catch (error) {
        console.error('Error al obtener recuento:', error);
        res.status(500).json({ message: 'Error al obtener recuento' });
    }
};
