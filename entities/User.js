const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {unique: true, dropDups: false},
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        default: 'USER'
    },
    password: {
        type: String,
        required: 'Password address is required',
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        required: 'Phone is required'
    },
    fullName: {
        type: String,
        required: 'Full name is required'
    }
});

module.exports = mongoose.model('User', UserSchema);
