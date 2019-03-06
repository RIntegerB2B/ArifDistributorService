'use strict';
var uploadProductDA = require('../upload-product/uploadProductDA');
const multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var appSetting = require('../../config/config');
var Product = require('../../model/product.model');
var zeroFill = require('zero-fill')

exports.createProduct = function (req, res) {
    try {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var date = day + "/" + month + "/" + year;
    
    
        var oYear = year.toString();
        var orderYear = oYear.slice(-2);
        var order = "PRO";
        var locale = "en-us";
        var result = currentDate.toLocaleString(locale, {
          month: "long"
        });
        var orderMonth = result.substr(0, 3).toUpperCase();

        Product.find().select().exec(function (err, details) {
            if(err) {
              res.status(500).send({
                message: "Some error occurred while retrieving notes."
              });
            } else{
               if (details[0] == null) {
                var productID = order + orderYear + orderMonth + "0001";
                console.log(productID);
                uploadProductDA.createProduct(req, res,  productID);
              } else {
                var arrayLength = details.length - 1;
              var maxID =details[arrayLength].productId.substr(10,3);
                var incOrder = maxID.slice(-4);
                var addZero = zeroFill(4, 1);
                var result = parseInt(incOrder) + parseInt(addZero);
                var results = zeroFill(4, result);
                var productID = order + orderYear + orderMonth + results;
                console.log(productID);
                uploadProductDA.createProduct(req, res,  productID);
              }
            }
            
          })

    } catch (error) {
        console.log(error);
    }
}

exports.createProductImage = function (req, res) {
    try {
        const DIR = appSetting.productUploadPath;
        const PATH = DIR + '/' + req.params.skuCode;
        mkdirp(PATH);
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH);
                uploadProductDA.createProductImage(req, file, res);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        let upload = multer({
            storage: storage
        }).array('uploads[]', 20); //only 20 images can be uploaded
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.status(501).json({
                    error: err
                });
            } else {
                res.status(200).send({
                    message: "success"
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}


exports.getProduct = function (req, res) {
    try {
        uploadProductDA.getProduct(req, res);
    } catch (error) {
        console.log(error);
    }
}