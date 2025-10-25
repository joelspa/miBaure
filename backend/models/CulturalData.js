// models/CulturalData.js
const mongoose = require('mongoose');

const culturalDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Historia', 'Tradiciones', 'Lengua', 'Cosmovisión', 'Territorio', 'Organización Social', 'Cocina', 'Otro']
    },
    content: {
        type: String,
        required: true
    },
    subsections: [{
        subtitle: String,
        text: String
    }],
    images: [{
        url: String,
        caption: String
    }],
    sources: [{
        type: String
    }],
    relatedTopics: [{
        type: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('CulturalData', culturalDataSchema);
