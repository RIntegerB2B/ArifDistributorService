var ordersMgr = require('./ordersDA');



exports.viewNewOrders = function (req, res) {
    ordersMgr.viewNewOrders(req, res);
};

exports.viewAllOrders = function (req, res) {
    ordersMgr.viewAllOrders(req, res);
};
