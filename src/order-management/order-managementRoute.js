var ordersMgr = require('./orders/ordersMgr');

module.exports = function(app) {
    app.route('/neworders')
        .get(ordersMgr.viewNewOrders);


        app.route('/allorders')
        .get(ordersMgr.viewAllOrders);

        app.route('/orders/:id') 
        .get(ordersMgr.viewSingleOrders);
}