var mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    position: Number,
    productsID: [String],
    promotionTitle: String,
    status: Number


});
const Promotions = mongoose.model('promotions', PromotionSchema);
module.exports = Promotions;