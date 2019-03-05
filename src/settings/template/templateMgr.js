var templateDA = require('./templateDA');
const multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var appSetting = require('../../config/config');


exports.createTemplateImage = function (req, res) {
    try {
        const PATH = appSetting.templateUploadPath;
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH);
                templateDA.createTemplateImage(req,file,res);
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

exports.getTemplateImages = function (req, res) {
    try {
        templateDA.getTemplateImages(req,res);
    } catch (error) {
        console.log(error);
    }
}
