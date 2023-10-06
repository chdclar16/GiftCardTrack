const express = require('express');
const router = express.Router();
const { createCard, getGiftCards, getGiftCard, updateGiftCard, deleteGiftCard } = require('../controllers/cardController')

// Create a new Gift Card
router.post('/', createCard)


// Get all giftcards from db
router.get('/:id', getGiftCards);

// Get one giftcard
router.get('/one/:id', getGiftCard);

// Update giftcard
router.put('/:id', updateGiftCard);

// Delete giftcard
router.delete('/:id', deleteGiftCard);

module.exports = router
