// routes/culturalData.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const culturalDataController = require('../controllers/culturalDataController');

router.get('/', culturalDataController.getAllCulturalData);
router.get('/category/:category', culturalDataController.getCulturalDataByCategory);
router.get('/:id', culturalDataController.getCulturalDataById);
router.post('/', upload.single('image'), culturalDataController.createCulturalData);
router.put('/:id', upload.single('image'), culturalDataController.updateCulturalData);
router.delete('/:id', culturalDataController.deleteCulturalData);

module.exports = router;
