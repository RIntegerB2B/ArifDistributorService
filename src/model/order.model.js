var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderDate: Date,
    customerId: String,
    orderId: String,
    products: [{
        productId: String,
        qty: Number,
        price: Number,
    }],
    total: Number,
    orderStatus: String
});


const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;