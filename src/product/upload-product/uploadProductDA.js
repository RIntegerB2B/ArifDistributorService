'use strict';
var Product = require('../../model/product.model');
var MOQ = require('../../model/moq.model');
var fs = require('fs');
var appSetting = require('../../config/config');

exports.createProduct = function (req, res, productID) {
    var productData = new Product(req.body);
    productData.price = req.body.region[0].regionPrice;
    productData.mfdQty = req.body.region[0].regionQuantity;
    productData.mainCategory = req.body.mainCategory;
    productData.productId = productID;
    productData.moq = req.body.region[0].moq;
    productData.save(
        function (err, productDetails) {
            if (err) { // if it contains error return 0
                res.status(500).send({
                    "result": 0
                });
            } else {
                res.status(200).json(productDetails);


            }
        });

}

exports.createProductImage = function (req, file, res) {
    Product.findOne({
        'skuCode': req.params.skuCode,
    }, function (err, productDetail) {
        if (err) {
            console.log(err);

        } else {
            if (productDetail !== null) {
                if (productDetail.productImageName.length === 0) {
                    productDetail.productImageName.push(file.originalname);
                    productDetail.save(function (err, data) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            /*  console.log(data); */
                        }
                    })
                } else if (productDetail.productImageName.length !== 0) {
                    var ID = file.originalname;
                    var i = productDetail.productImageName.indexOf(ID);
                    if (i > -1) {
                        console.log('Exist');
                    } else {
                        productDetail.productImageName.push(file.originalname);
                        productDetail.save(function (err, data) {
                            if (err) {
                                res.status(500).send({
                                    "result": 0
                                });
                            } else {
                                /*  console.log(data); */
                            }
                        })
                    }
                }
            } else {
                

            }



        }
    });
}

exports.getProduct = function (req, res) {

    Product.find({}).select().exec(function (err, productData) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productData.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productData[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productData[i].productImageName[j] = appSetting.productServerPath + productData[i].skuCode + '/' + productData[i].productImageName[j];
                }
            }
            res.status(200).json(productData);
        }
    });
}