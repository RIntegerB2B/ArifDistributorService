var customerDetailMgr = require('./customer-detail/customerDetailMgr');

module.exports = function(app) {
    app.route('/customers')
        .get(customerDetailMgr.viewCustomers);

        app.route('/customers/:id')
        .get(customerDetailMgr.viewSingleCustomers);

}