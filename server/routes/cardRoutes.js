const express = require('express');
const router = express.Router();
const { createCard, getGiftCards, getGiftCard, updateGiftCard } = require('../controllers/cardController')

// Create a new Gift Card
router.post('/', createCard)


// Get all giftcards from db
router.get('/', getGiftCards);

// Get one giftcard
router.get('/:id', getGiftCard);

// Update giftcard
router.put('/:id', updateGiftCard);

module.exports = router
