'use strict';
var productMgr = require('./upload-product/uploadProductMgr');
var viewProductMgr = require('./view-product/viewProductMgr');


module.exports = function (app) {
    app.route('/product')
        .post(productMgr.createProduct);

        app.route('/productimages/:skuCode')
        .put(productMgr.createProductImage);

        app.route('/product')
        .get(productMgr.getProduct);

        app.route('/sku/:skucode')
        .delete(viewProductMgr.deleteProduct);

}