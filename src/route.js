var accountRoutes = require('./account/accountRoute');
var settingRoutes = require('./settings/settingsRoute');
var productRoutes= require('./product/productRoute');
var orderRoutes =  require('./order-management/order-managementRoute');

exports.loadRoutes = function (app) {
    accountRoutes(app);
    settingRoutes(app);
    productRoutes(app);
    orderRoutes(app);
};

