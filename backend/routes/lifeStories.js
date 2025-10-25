// routes/lifeStories.js
const express = require('express');
const router = express.Router();
const lifeStoryController = require('../controllers/lifeStoryController');

router.get('/', lifeStoryController.getAllLifeStories);
router.get('/:id', lifeStoryController.getLifeStoryById);

module.exports = router;
