var mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    position: Number,
    bannerImage: String,
    bannerDescription: String,
    region: String,
    isApproved: Boolean
});
const Banners = mongoose.model('banners', BannerSchema);
module.exports = Banners;