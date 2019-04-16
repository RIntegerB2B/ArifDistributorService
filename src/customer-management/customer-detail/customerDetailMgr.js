var customerDetailDA = require('./customerDetailDA');

exports.viewCustomers = function (req, res) {
    customerDetailDA.viewCustomers(req, res)
  };