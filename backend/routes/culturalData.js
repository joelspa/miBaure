// routes/culturalData.js
const express = require('express');
const router = express.Router();
const culturalDataController = require('../controllers/culturalDataController');

router.get('/', culturalDataController.getAllCulturalData);
router.get('/category/:category', culturalDataController.getCulturalDataByCategory);
router.get('/:id', culturalDataController.getCulturalDataById);

module.exports = router;
