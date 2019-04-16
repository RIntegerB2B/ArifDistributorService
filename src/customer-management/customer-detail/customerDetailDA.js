var Customer = require('../../model/customerDetails.model');

exports.viewCustomers = function (req, res) {
    Customer.find({}).select().exec(function (err, allCustomers) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving all orders."
            });
        } else {
           
            res.status(200).json(allCustomers);
        }
    });
  };

  exports.viewSingleCustomers = function (req, res) {
    Customer.find({'customerId':req.params.id}).select().exec(function (err, allCustomers) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving all orders."
            });
        } else {
           
            res.status(200).json(allCustomers);
        }
    });
  };