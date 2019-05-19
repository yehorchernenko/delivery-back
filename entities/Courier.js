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


CourierSchema.methods.update = function (order) {
    var courier = this;

    return courier.update({
        $push : {
            queue: order
        }
    });
};

CourierSchema.statics.free = function () {
    const Courier = this;

    return Courier.find().sort('queue').limit(1);
};


const Courier = mongoose.model('Courier', CourierSchema);

module.exports = Courier;

