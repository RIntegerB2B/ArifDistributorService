var ordersMgr = require('./ordersDA');



exports.viewNewOrders = function (req, res) {
    ordersMgr.viewNewOrders(req, res);
};

exports.viewAllOrders = function (req, res) {
    ordersMgr.viewAllOrders(req, res);
};

exports.viewSingleOrders = function (req, res) {
    ordersMgr.viewSingleOrders(req, res);
};
exports.updateStatus = function (req, res) {
    try {
        ordersMgr.updateStatus(req, res);
    } catch (error) {
        console.log(error);
    }

};
