const mongoose = require('mongoose');


const CourierSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queue: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            default: []
    }]

});

module.exports = mongoose.model('Courier', CourierSchema);
