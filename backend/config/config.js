// config/config.js
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    geminiApiKey: process.env.GEMINI_API_KEY,
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    nodeEnv: process.env.NODE_ENV || 'development'
};
