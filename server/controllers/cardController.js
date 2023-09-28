const { GiftCard } = require('../models/CardSchema.js');

// Creating a card
const createCard = async(req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.balance
        ) {
            return res.status(400).send({
                message: 'Missing required fields, check console for more'
            })
        }
        const newCard = {
            name: req.body.name,
            balance: req.body.balace,
            user: req.user._id
        };

        const card = await giftCardSchema.create(newCard)
        return res.status(201).send(card)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: `Error check console for more ${err.message}`})
    }
}

// Get all giftcards
const getGiftCards = async(req, res) => {
    try {
        const giftCards = await GiftCard.find({});

        return res.status(200).send({
            count: giftCards.length,
            data: giftCards,
        })
        } catch (err) {
            console.log({"Unable to get all gift cards": err.message});
            res.status(500).send({ message: err.message });
        }
}

// Get one giftcard
const getGiftCard = async(req, res) => {
    try {
        const { id } = req.params;
        const giftCard = await GiftCard.findById(id)
        return res.status(200).send(giftCard)
    } catch (err) {
        console.log({ "Could not get gift card": err.message })
        res.status(500).send({ message: err })
    }
}

// Update giftcards
const updateGiftCard = async(req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.balance
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        const { id } = req.paramsl
        const result = await GiftCard.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.stauts(404).json({
                message: 'Giftcard not found'
            });
        }
        return res.status(200).send({
            message: 'GiftCard Updated'
        }) ;
    } catch (err) {
        console.log({"Update gift card went wrong": err.message})
        res.status(500).send({ message: err.message })
    }
}


module.exports = {
    createCard,
    getGiftCards,
    getGiftCard,
    updateGiftCard
}
