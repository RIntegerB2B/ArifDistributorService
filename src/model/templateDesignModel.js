var mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    templateImageName: String,


});

const Template = mongoose.model('template', TemplateSchema);
module.exports = Template;