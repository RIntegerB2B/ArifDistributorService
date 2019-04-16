    
var mongoose = require('mongoose');
const addressFormSchema = new mongoose.Schema({
  streetAddress: String,
  building: Number,
  landmark: Number,
  city: String,
  state: String,
  pincode: String
});

module.exports = addressFormSchema;