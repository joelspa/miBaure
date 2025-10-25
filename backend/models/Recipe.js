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
    tags: [String], // Ej: ["Yuca", "Río", "Tradicional", "Maíz"]
    imageUrl: { type: String }, // URL de la imagen principal de la receta
    images: [{ // Array de imágenes adicionales
        url: String,
        caption: String
    }]
});

module.exports = mongoose.model('Recipe', recipeSchema);