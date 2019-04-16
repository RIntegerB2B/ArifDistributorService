var Orders = require('../../model/order.model');

exports.viewNewOrders = function (req, res) {
    Orders.find({orderStatus: 'New Order'}).select().exec(function (err, newOrders) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
           
            res.status(200).json(newOrders);
        }
    });
};


exports.viewAllOrders = function (req, res) {
    Orders.find({}).select().exec(function (err, allOrders) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving all orders."
            });
        } else {
           
            res.status(200).json(allOrders);
        }
    });
};

exports.viewSingleOrders = function (req, res) {
    Orders.find({_id: req.params.id}).select().exec(function (err, singleOrders) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving all orders."
            });
        } else {
           
            res.status(200).json(singleOrders);
        }
    });
};

exports.updateStatus = function (req, res) {
    Orders.findOne({_id: req.params.id}).select().exec(function (err, singleOrders) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving all orders."
            });
        } else {
           singleOrders.orderStatus = req.body.orderStatus;
           singleOrders.save(function(err, orders) {
               if(err) {
                   console.log(err);
               } else {
                Orders.find({_id: req.params.id}).select().exec(function (err, singleOrders) {
                    if (err) {
                        res.status(500).send({
                            message: "Some error occurred while retrieving all orders."
                        });
                    } else {
                       
                        res.status(200).json(singleOrders);
                    }
                });
               }
           })
            
        }
    });
};

