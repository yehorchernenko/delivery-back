const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        select: false
    }
});

module.exports = mongoose.model('User', UserSchema);
