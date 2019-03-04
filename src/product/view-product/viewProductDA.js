
var  Product = require('../../model/product.model');
var rmdir = require('rmdir');
var appSetting = require('../../config/config');
exports.deleteProduct = function (req, res) {

    Product.findOneAndRemove({'skuCode':req.params.skucode}, function (err) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {
            const PATH = appSetting.productUploadPath + '/' + req.params.skucode;
            rmdir(PATH, function (err, paths) {
                if (err) {
                    res.status(500).send({
                        err
                    });
                } else {
                    Product.find({}).select().exec(function (err, productData) {
                        if (err) {
                            res.status(500).send({
                                message: "Some error occurred while retrieving notes."
                            });
                        } else {
                            res.status(200).json(productData);
                        }
                    });
                }
            });

        }
    });

}