// routes/culturalData.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const culturalDataController = require('../controllers/culturalDataController');
const { requireToken } = require('../middleware/adminAuth');

router.get('/', culturalDataController.getAllCulturalData);
router.get('/category/:category', culturalDataController.getCulturalDataByCategory);
router.get('/:id', culturalDataController.getCulturalDataById);
router.post('/', requireToken, upload.single('image'), culturalDataController.createCulturalData);
router.put('/:id', requireToken, upload.single('image'), culturalDataController.updateCulturalData);
router.delete('/:id', requireToken, culturalDataController.deleteCulturalData);

module.exports = router;
