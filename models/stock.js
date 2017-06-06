const mongoose = require('mongoose')
const schema = mongoose.Schema;

let stockSchema = new schema({
    symbol: String,
    created: Date,
    price: Number
});

module.exports = mongoose.model('stock', stockSchema);
