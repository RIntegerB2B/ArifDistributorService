var mongoose = require('mongoose');

const ADSchema = new mongoose.Schema({
    position: Number,
    adsImageName: String,
    adsDescription: String,
    isApproved: Boolean
});
const ADs = mongoose.model('ads', ADSchema);
module.exports = ADs;