
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

module.exports = {
    createCard
}
