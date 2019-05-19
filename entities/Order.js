const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverAddress: {
        city: { type: String },
        address: { type: String }
    },
    senderAddress: {
        city: { type: String },
        address: { type: String }
    },
    info: {
        date: { type: Date },
        price: { type: Number },
    }
});

module.exports = mongoose.model('Order', OrderSchema);
