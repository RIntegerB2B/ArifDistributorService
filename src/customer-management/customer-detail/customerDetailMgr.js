var customerDetailDA = require('./customerDetailDA');

exports.viewCustomers = function (req, res) {
    customerDetailDA.viewCustomers(req, res)
  };

  exports.viewSingleCustomers = function (req, res) {
    customerDetailDA.viewSingleCustomers(req, res)
  };

  