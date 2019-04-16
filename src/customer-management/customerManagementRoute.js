var customerDetailMgr = require('./customer-detail/customerDetailMgr');

module.exports = function(app) {
    app.route('/customers')
        .get(customerDetailMgr.viewCustomers);

}