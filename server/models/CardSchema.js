const mongoose = require('mongoose')

const giftCardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            require: true,
            min: 0,
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
