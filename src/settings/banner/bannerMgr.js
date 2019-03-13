var bannersDA = require('./bannerDA');
const multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var appSetting = require('../../config/config');


exports.createBanners = function (req, res) {
    try {
        const PATH = appSetting.bannerUploadPath;
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH);
                bannersDA.createBanners(req,file,res);
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
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.deleteBanners = function (req, res) {
    try {
        bannersDA.deleteBanners(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getBanners = function (req, res) {
    try {
        bannersDA.getBanners(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getUnApprovedBanners = function (req, res) {
    try {
        bannersDA.getUnApprovedBanners(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.approveBanner = function (req, res) {
    try {
        bannersDA.approveBanner(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.approvedBanner = function (req, res) {
    try {
        bannersDA.approvedBanner(req, res);
    } catch (error) {
        console.log(error);
    }
}


