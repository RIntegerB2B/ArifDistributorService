var Promotions = require('../../model/promotions.model');
var appSetting = require('../../config/config');

exports.createPromotions = function (req, res) {
    var promotions = new Promotions();
    promotions.promotionTitle = req.body.promotionTitle;
    promotions.position = req.body.promotionPosition;
    promotions.productsID = req.body.productId;
    promotions.status = 0
    promotions.save(function (err, promotions) {
        if (err) {
            res.status(500).send({
                "message": 'promotions Not created'
            });

        } else {
            res.status(200).json(promotions);
        }
    });
}

exports.deletePromotions = function (req, res) {
    Promotions.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {
            Promotions.find({'status': 1}).select().exec(function (err, promotions) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while retrieving notes."
                    });
                } else {
                    res.status(200).json(promotions);
                }
            });
        }
    });
}
exports.getPromotions = function (req, res) {
    Promotions.aggregate([{

        $lookup: {
            "from": "products",
            "localField": "productsID",
            "foreignField": "productId",
            "as": "joinedtable"

        },
    }, {
        $match: {
            "joinedtable": {
                $ne: []
            }
        }
    }]).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {

            var productLength = promotions.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var joinedTable = promotions[i].joinedtable;
                var joinedTableLength = joinedTable.length - 1;
                for (var j = 0; j <= joinedTableLength; j++) {
                    var productImage = joinedTable[j].productImageName;
                    var productImageLength = productImage.length - 1;;
                    for (var k = 0; k <= productImageLength; k++) {
                        joinedTable[j].productImageName[k] = appSetting.productServerPath + joinedTable[j].skuCode + '/' + joinedTable[j].productImageName[k];
                    }
                }
            }
            res.status(200).json(promotions);


        }
    })
}
exports.editPromotions = function (req, res) {
    Promotions.findById(req.params.id, function (err, promotions) {
        if (err) return handleError(err);
        else {
            promotions.position = req.body.position;
            promotions.description = req.body.description;
            promotions.save(
                function (err) {
                    if (err) { // if it contains error return 0
                        res.status(500).send({
                            "result": 0
                        });
                    } else {
                        Promotions.find({}).select().exec(function (err, promotions) {
                            if (err) {
                                res.status(500).send({
                                    message: "Some error occurred while retrieving notes."
                                });
                            } else {
                                res.status(200).json(promotions);
                            }
                        });
                    }
                });

        }
    });
}
exports.disablePromotions = function (req, res) {
    Promotions.find({
        '_id': req.params.id
    }).select().sort({
        position: 1
    }).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            promotions[0].status = 2;
            promotions[0].save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occured while retreiving notes"
                    })
                } else {
                    Promotions.find({'status': 1}).select().exec(function (err, promotions) {
                        if (err) {
                            res.status(500).send({
                                message: "Some error occurred while retrieving notes."
                            });
                        } else {
                            res.status(200).json(promotions);
                        }
                    });
                }
            })
        }
    });
}
exports.getSinglePromotions = function (req, res) {
    try {
        promotionsDA.getSinglePromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.approvePromotions = function (req, res) {
    Promotions.find({
        '_id': req.params.id
    }).select().sort({
        position: 1
    }).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            promotions[0].status = 1;
            promotions[0].save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occured while retreiving notes"
                    })
                } else {
                    Promotions.find({'status': 0}).select().exec(function (err, promotions) {
                        if (err) {
                            res.status(500).send({
                                message: "Some error occurred while retrieving notes."
                            });
                        } else {
                            res.status(200).json(promotions);
                        }
                    });
                }
            })
        }
    });
}
exports.approvedPromotions = function (req, res) {
    Promotions.find({'status': 1}).select().exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            res.status(200).json(promotions);
        }
    });
}
exports.getUnApprovedPromotions = function (req, res) {
    Promotions.find({'status': 0}).select().exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            res.status(200).json(promotions);
        }
    });
}