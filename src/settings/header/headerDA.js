var Header  = require('../../model/header.model');
var appSetting = require('../../config/config');

exports.createLogoImage = function (req,file, res) {
    Header.find({}).select().exec(function (err, headerData) {
        if (err) {
            res.status(500).send({
                "result": 'error occured while retreiving data'
            })
        } else {
            var header = new Header();
            header.logoImageName = file.originalname;
            if (headerData.length == 0) {
                
                header.save(function (err, data) {
                        if (err) {
                            res.status(500).send({
                                "result": 'error occured while saving data'
                            })
                        } else {
                            Header.find({}).select().exec(function (err, header) {
                                if (err) {
                                    res.status(500).send({
                                        message: "Some error occurred while retrieving notes."
                                    });
                                } else {
                                    header[0].logoImageName =  appSetting.headerServerPath + header[0].logoImageName;
                                    res.status(200).json(header);
                                }
                            });
                        }
                    })
                

            } else {
                headerData[0].logoImageName = file.originalname;
                headerData[0].save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            "result": 'error occured while saving data'
                        })
                    } else {
                        Header.find({}).select().exec(function (err, header) {
                            if (err) {
                                res.status(500).send({
                                    message: "Some error occurred while retrieving notes."
                                });
                            } else {
                                header[0].logoImageName =  appSetting.headerServerPath + header[0].logoImageName;
                                res.status(200).json(header);
                            }
                        });
                    }
                })

            }
        }
    });
}

exports.getHeaderDetails = function (req, res) {
    Header.find({}).select().exec(function (err, header) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            header[0].logoImageName =  appSetting.headerServerPath + header[0].logoImageName;
            res.status(200).json(header);
        }
    });
}