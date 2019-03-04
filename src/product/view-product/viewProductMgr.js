'use strict';
var viewProductDA = require('../view-product/viewProductDA');


exports.deleteProduct = function (req, res) {
    try {

        viewProductDA.deleteProduct(req, res);


    } catch (error) {
        console.log(error);
    }
}