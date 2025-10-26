// models/LifeStory.js
const mongoose = require('mongoose');

const lifeStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    community: {
        type: String
    },
    story: {
        type: String,
        required: true
    },
    relatedThemes: [{
        type: String
    }],
    photoUrl: {
        type: String
    },
    recordedDate: {
        type: Date
    },
    recordedBy: {
        type: String
    },
    images: [{                        // Galería extra
    url: String,
    caption: String
  }],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('LifeStory', lifeStorySchema);
