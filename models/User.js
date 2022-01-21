mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deposit : {
        type: Number
    },
    role : {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Users',UserSchema);