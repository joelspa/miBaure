// routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET todas las recetas
router.get('/', recipeController.getAllRecipes);

// GET una receta
router.get('/:id', recipeController.getRecipeById);

module.exports = router;