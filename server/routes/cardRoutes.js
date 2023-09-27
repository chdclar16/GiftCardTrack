const express = require('express');
const router = express.Router();
const { createCard } = require('../controllers/cardController')

// Create a new Gift Card
router.post('/new', createCard)


module.exports = router
