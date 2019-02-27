'use strict';
var uploadProductDA = require('../upload-product/uploadProductDA');
const multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var appSetting = require('../../config/config');
var Product = require('../../model/product.model');

exports.createProduct = function (req, res) {
    try {

        uploadProductDA.createProduct(req, res);


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