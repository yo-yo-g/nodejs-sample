const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { type: String, required: true, min: 2,  max: 20 },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1, max: 300},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
