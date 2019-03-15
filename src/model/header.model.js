var mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    logoImageName: String,
    isApproved: Boolean


});

const Header = mongoose.model('header', HeaderSchema);
module.exports = Header;