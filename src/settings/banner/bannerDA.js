var Banners = require('../../model/banners.model');
var appSetting = require('../../config/config');
var fs = require('fs');

exports.createBanners = function (req, file, res) {
    var banners = new Banners();
    banners.bannerImage = file.originalname;
    banners.position = req.params.position;
    banners.isApproved = false; // later change it as false
    banners.save(function (err, ads) {
        if (err) {
            res.status(500).send({
                "message": 'banners Not created'
            });

        } else {
            res.status(200).json(ads);
        }
    });
}

exports.deleteBanners = function (req, res) {
    Banners.find({
        '_id': req.params.id
    }, function (err, bannerDetails) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {
            const PATH = appSetting.bannerUploadPath + '/' + bannerDetails[0].bannerImage;
            fs.unlink(PATH, (err) => {
                if (err) {
                    throw err;
                } else {
                    Banners.findByIdAndRemove(req.params.id, function (err) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            Banners.find({}).select().sort({
                                position: 1
                            }).exec(function (err, bannerImages) {
                                if (err) {
                                    res.status(500).send({
                                        message: "Some error occurred while retrieving notes."
                                    });
                                } else {
                                    var bannerLength = bannerImages.length - 1;
                                    for (var i = 0; i <= bannerLength; i++) {
                                        bannerImages[i].bannerImage = appSetting.bannerServerPath + bannerImages[i].bannerImage;
                                    }
                                    res.status(200).json(bannerImages);
                                }
                            });
                        }
                    });
                }

            });
        }
    });
}

exports.getBanners = function (req, res) {
    Banners.find({}).select().sort({
        position: 1
    }).exec(function (err, bannerImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var bannerLength = bannerImages.length - 1;
            for (var i = 0; i <= bannerLength; i++) {
                bannerImages[i].bannerImage = appSetting.bannerServerPath + bannerImages[i].bannerImage;
            }
            res.status(200).json(bannerImages);
        }
    });
}

exports.getUnApprovedBanners = function (req, res) {

    Banners.find({
        'isApproved': false
    }).select().sort({
        position: 1
    }).exec(function (err, bannerImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var bannerLength = bannerImages.length - 1;
            for (var i = 0; i <= bannerLength; i++) {
                bannerImages[i].bannerImage = appSetting.bannerServerPath + bannerImages[i].bannerImage;
            }
            res.status(200).json(bannerImages);
        }
    });
}
exports.approveBanner = function (req, res) {
    Banners.find({
        '_id': req.params.id
    }).select().sort({
        position: 1
    }).exec(function (err, bannerImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            bannerImages[0].isApproved = true;
            bannerImages[0].save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occured while retreiving notes"
                    })
                } else {
                    Banners.find({
                        'isApproved': false
                    }).select().sort({
                        position: 1
                    }).exec(function (err, bannerImages) {
                        if (err) {
                            res.status(500).send({
                                message: "Some error occurred while retrieving notes."
                            });
                        } else {
                            var bannerLength = bannerImages.length - 1;
                            for (var i = 0; i <= bannerLength; i++) {
                                bannerImages[i].bannerImage = appSetting.bannerServerPath + bannerImages[i].bannerImage;
                            }
                            res.status(200).json(bannerImages);
                        }
                    });
                }
            })
        }
    });
}

exports.approvedBanner = function (req, res) {
    Banners.find({
        'isApproved': true
    }).select().sort({
        position: 1
    }).exec(function (err, bannerImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var bannerLength = bannerImages.length - 1;
            for (var i = 0; i <= bannerLength; i++) {
                bannerImages[i].bannerImage = appSetting.bannerServerPath + bannerImages[i].bannerImage;
            }
            res.status(200).json(bannerImages);
        }
    });
}