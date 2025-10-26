// controllers/lifeStoryController.js
const LifeStory = require('../models/LifeStory');
const { buildPublicUrl } = require('../utils/buildUrl');

// Helpers para parsear arrays compatibles con multipart/form-data
const parseMaybe = v => {
  if (Array.isArray(v)) return v;
  if (typeof v !== 'string') return v;
  try { return JSON.parse(v); } catch { return v; }
};

const toArray = v => Array.isArray(v) ? v : (typeof v === 'string' && v ? [v] : []);

// GET /api/life-stories - Obtener todos
exports.getAllLifeStories = async (req, res) => {
  try {
    const stories = await LifeStory.find({ deleted: false }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error('Error al obtener recuentos de vida:', error);
    res.status(500).json({ message: 'Error al obtener recuentos de vida' });
  }
};

// GET /api/life-stories/:id - Obtener uno
exports.getLifeStoryById = async (req, res) => {
  try {
    const story = await LifeStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Recuento no encontrado' });
    res.json(story);
  } catch (error) {
    console.error('Error al obtener recuento:', error);
    res.status(500).json({ message: 'Error al obtener recuento' });
  }
};

// POST /api/life-stories - Crear con imagen principal (campo: image)
exports.createLifeStory = async (req, res) => {
  try {
    if (!req.body.title || !req.body.title.trim()) {
      return res.status(400).json({ message: 'El campo "title" es requerido' });
    }
    if (!req.body.personName || !req.body.personName.trim()) {
      return res.status(400).json({ message: 'El campo "personName" es requerido' });
    }
    if (!req.body.story || !req.body.story.trim()) {
      return res.status(400).json({ message: 'El campo "story" es requerido' });
    }

    const relatedThemes = toArray(parseMaybe(req.body.relatedThemes));
    const photoUrl = req.file ? buildPublicUrl(req, req.file.path) : null;

    // recordedDate puede venir como string ISO; si no, lo dejamos undefined
    const recordedDate = req.body.recordedDate ? new Date(req.body.recordedDate) : undefined;

    const newStory = await LifeStory.create({
      title: req.body.title.trim(),
      personName: req.body.personName.trim(),
      age: req.body.age,
      community: req.body.community,
      story: req.body.story.trim(),
      relatedThemes,
      photoUrl,
      recordedDate,
      recordedBy: req.body.recordedBy
    });

    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error al crear recuento de vida:', error);
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/life-stories/:id/image - Agregar/actualizar imagen principal
exports.updateMainImage = async (req, res) => {
  try {
    const story = await LifeStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Recuento no encontrado' });
    if (!req.file) return res.status(400).json({ message: 'Falta el archivo "image"' });

    story.photoUrl = buildPublicUrl(req, req.file.path);
    await story.save();

    res.json(story);
  } catch (error) {
    console.error('Error al actualizar imagen principal:', error);
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/life-stories/:id/images - Agregar múltiples imágenes al array images[]
exports.addExtraImages = async (req, res) => {
  try {
    const story = await LifeStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Recuento no encontrado' });
    if (!req.files?.length) return res.status(400).json({ message: 'Faltan archivos "images"' });

    const extras = req.files.map(f => ({ url: buildPublicUrl(req, f.path), caption: '' }));
    story.images = [...(story.images || []), ...extras];
    await story.save();

    res.json(story);
  } catch (error) {
    console.error('Error al agregar imágenes:', error);
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/life-stories/:id - Actualizar recuento completo
exports.updateLifeStory = async (req, res) => {
  try {
    const story = await LifeStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Recuento no encontrado' });

    if (req.body.title) story.title = req.body.title.trim();
    if (req.body.personName) story.personName = req.body.personName.trim();
    if (req.body.age !== undefined) story.age = req.body.age;
    if (req.body.community !== undefined) story.community = req.body.community;
    if (req.body.story) story.story = req.body.story.trim();
    if (req.body.recordedBy !== undefined) story.recordedBy = req.body.recordedBy;
    
    if (req.body.relatedThemes) story.relatedThemes = toArray(parseMaybe(req.body.relatedThemes));
    if (req.body.recordedDate) story.recordedDate = new Date(req.body.recordedDate);
    
    if (req.file) {
      story.photoUrl = buildPublicUrl(req, req.file.path);
    }

    await story.save();
    res.json(story);
  } catch (error) {
    console.error('Error al actualizar recuento:', error);
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/life-stories/:id - Eliminar recuento (soft delete)
exports.deleteLifeStory = async (req, res) => {
  try {
    const story = await LifeStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Recuento no encontrado' });

    story.deleted = true;
    story.deletedAt = new Date();
    await story.save();

    res.json({ message: 'Recuento eliminado con éxito', deletedId: req.params.id });
  } catch (error) {
    console.error('Error al eliminar recuento:', error);
    res.status(500).json({ message: error.message });
  }
};
