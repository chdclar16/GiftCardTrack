const mongoose = require('mongoose')

const giftCardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
            min: 0,
        },
        photo: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);


const GiftCard = mongoose.model('GiftCard', giftCardSchema);

module.exports = GiftCard
