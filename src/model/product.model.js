var mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    productTitle: String,
    productName: String,
    productDescription: String,
    overview: String,
    price: Number,
    color: String, 
    productImageName: [String],
    subCategory: String,
    // details
    styleCode: String, 
    skuCode: String, 
    material: String,
    brand: String,
    dimensions: String,
    weight: String,
    assembly: String,
    packageDetails: String,
});


const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
