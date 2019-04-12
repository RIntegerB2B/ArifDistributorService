var Template  = require('../../model/templateDesignModel');
var appSetting = require('../../config/config');

exports.createTemplateImage = function (req,file, res) {
    Template.find({}).select().exec(function (err, templateData) {
        if (err) {
            res.status(500).send({
                "result": 'error occured while retreiving data'
            })
        } else {
            var template = new Template();
            template.templateImageName = file.originalname;
            if (templateData.length == 0) {
                
                template.save(function (err, data) {
                        if (err) {
                            res.status(500).send({
                                "result": 'error occured while saving data'
                            })
                        } else {
                            Template.find({}).select().exec(function (err, template) {
                                if (err) {
                                    res.status(500).send({
                                        message: "Some error occurred while retrieving notes."
                                    });
                                } else {
                                    template[0].templateImageName =  appSetting.templateServerPath + template[0].templateImageName;
                                    res.status(200).json(template);
                                }
                            });
                        }
                    })
                

            } else {
                templateData[0].templateImageName = file.originalname;
                templateData[0].save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            "result": 'error occured while saving data'
                        })
                    } else {
                        Template.find({}).select().exec(function (err, template) {
                            if (err) {
                                res.status(500).send({
                                    message: "Some error occurred while retrieving notes."
                                });
                            } else {
                                if(t)
                                template[0].templateImageName =  appSetting.templateServerPath + template[0].templateImageName;
                                res.status(200).json(template);
                            }
                        });
                    }
                })

            }
        }
    });
}

exports.getTemplateImages = function (req, res) {
    Template.find({}).select().exec(function (err, template) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            template[0].templateImageName =  appSetting.templateServerPath + template[0].templateImageName;
            res.status(200).json(template);
        }
    });
}