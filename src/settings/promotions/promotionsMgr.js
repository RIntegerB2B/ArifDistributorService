var promotionsDA = require('./promotionsDA');
const multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var appSetting = require('../../config/appSetting');

exports.createPromotions = function (req, res) {
    try {
        promotionsDA.createPromotions(req, res);

    } catch (error) {
        console.log(error);
    }
}
exports.deletePromotions = function (req, res) {
    try {
        promotionsDA.deletePromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getPromotions = function (req, res) {
    try {
        promotionsDA.getPromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.editPromotions = function (req, res) {
    try {
        promotionsDA.editPromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getSinglePromotions = function (req, res) {
    try {
        promotionsDA.getSinglePromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.approvePromotions = function (req, res) {
    try {
        promotionsDA.approvePromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.approvedPromotions = function (req, res) {
    try {
        promotionsDA.approvedPromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getUnApprovedPromotions = function (req, res) {
    try {
        promotionsDA.getUnApprovedPromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}
