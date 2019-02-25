var accountRoutes = require('./account/accountRoute');
var settingRoutes = require('./settings/settingsRoute');

exports.loadRoutes = function (app) {
    accountRoutes(app);
    settingRoutes(app);
};

