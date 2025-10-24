// controllers/recipeController.js
const Recipe = require('../models/Recipe');

// Obtener todas las recetas
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una receta por ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe == null) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// (Opcional) Crear una receta
exports.createRecipe = async (req, res) => {
    // ...lógica para crear una nueva receta...
};