mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    amountAvailable: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    productName : {
        type: String,
        required: true
    },
    sellerId  : {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Products',ProductSchema);