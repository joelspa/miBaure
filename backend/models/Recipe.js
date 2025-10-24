// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    baureName: { type: String, default: '' },
    description: { type: String },
    ingredients: [String],
    preparation: { type: String },
    utensils: [String],
    consumption: { type: String },
    conservation: { type: String },
    sourcePerson: { type: String }, // Ej: "Relato de: Adil Arredondo"
});

module.exports = mongoose.model('Recipe', recipeSchema);