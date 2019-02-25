var Promotions = require('../../model/promotions.model');


exports.createPromotions = function (req, res) {
    var promotions = new Promotions();
    promotions.promotionTitle = req.body.promotionTitle;
    promotions.position = req.body.position;
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
            Promotions.find({}).select().sort({
                position: 1
            }).exec(function (err, promotions) {
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
    Promotions.find({}).select().sort({
        position: 1
    }).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            res.status(200).json(promotions);
        }
    });
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