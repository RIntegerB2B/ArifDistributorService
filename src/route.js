var accountRoutes = require('./account/accountRoute');
var settingRoutes = require('./settings/settingsRoute');
var productRoutes= require('./product/productRoute');

exports.loadRoutes = function (app) {
    accountRoutes(app);
    settingRoutes(app);
    productRoutes(app);
};

