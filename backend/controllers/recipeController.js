const Recipe = require('../models/Recipe');
const { buildPublicUrl } = require('../utils/buildUrl');

const parseMaybe = v => {
  if (Array.isArray(v)) return v;              // ya viene como array
  if (typeof v !== 'string') return v;         // undefined/null/obj
  try { return JSON.parse(v); } catch { return v; }
};

const toArray = v => Array.isArray(v) ? v : (typeof v === 'string' && v ? [v] : []);

// GET todas
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ _id: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET por id
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST crear con imagen principal (campo: image)
exports.createRecipe = async (req, res) => {
  try {
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ message: 'El campo "name" es requerido' });
    }

    const ingredients = toArray(parseMaybe(req.body.ingredients));
    const utensils = toArray(parseMaybe(req.body.utensils));
    const tags = toArray(parseMaybe(req.body.tags));

    const imageUrl = req.file ? buildPublicUrl(req, req.file.path) : null;

    const recipe = await Recipe.create({
      name: req.body.name.trim(),
      baureName: req.body.baureName || '',
      description: req.body.description,
      ingredients,
      preparation: req.body.preparation,
      utensils,
      consumption: req.body.consumption,
      conservation: req.body.conservation,
      sourcePerson: req.body.sourcePerson,
      tags,
      imageUrl
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH actualizar/agregar imagen principal
exports.updateMainImage = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    if (!req.file) return res.status(400).json({ message: 'Falta el archivo "image"' });

    recipe.imageUrl = buildPublicUrl(req, req.file.path);
    await recipe.save();

    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH agregar múltiples imágenes al array images[]
exports.addExtraImages = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    if (!req.files?.length) return res.status(400).json({ message: 'Faltan archivos "images"' });

    const extras = req.files.map(f => ({ url: buildPublicUrl(req, f.path), caption: '' }));
    recipe.images = [...(recipe.images || []), ...extras];
    await recipe.save();

    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT actualizar receta completa
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });

    if (req.body.name) recipe.name = req.body.name.trim();
    if (req.body.baureName !== undefined) recipe.baureName = req.body.baureName;
    if (req.body.description !== undefined) recipe.description = req.body.description;
    if (req.body.preparation !== undefined) recipe.preparation = req.body.preparation;
    if (req.body.consumption !== undefined) recipe.consumption = req.body.consumption;
    if (req.body.conservation !== undefined) recipe.conservation = req.body.conservation;
    if (req.body.sourcePerson !== undefined) recipe.sourcePerson = req.body.sourcePerson;
    
    if (req.body.ingredients) recipe.ingredients = toArray(parseMaybe(req.body.ingredients));
    if (req.body.utensils) recipe.utensils = toArray(parseMaybe(req.body.utensils));
    if (req.body.tags) recipe.tags = toArray(parseMaybe(req.body.tags));
    
    if (req.file) {
      recipe.imageUrl = buildPublicUrl(req, req.file.path);
    }

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
