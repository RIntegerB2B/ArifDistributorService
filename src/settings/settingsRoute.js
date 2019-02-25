'use strict';
var adsMgr  = require('./ads/adsMgr');
var bannersMgr = require('./banner/bannerMgr');
var promotionsMgr = require('./promotions/promotionsMgr');

module.exports = function(app) {

    // ads 
    app.route('/ads/:position')
    .put(adsMgr.createAds);

    app.route('/deleteads/:id')
    .delete(adsMgr.deleteAds);

    app.route('/ads')
    .get(adsMgr.getAds);

    // banners

    app.route('/banners/:position')
    .put(bannersMgr.createBanners);

    app.route('/deletebanners/:id')
    .delete(bannersMgr.deleteBanners);

    app.route('/banners')
    .get(bannersMgr.getBanners);

    // promotions
    app.route('/promotions')
    .post(promotionsMgr.createPromotions);

    app.route('/deletepromotions/:id')
    .delete(promotionsMgr.deletePromotions);

    app.route('/promotions')
    .get(promotionsMgr.getPromotions);

    app.route('/editpromotions/:id')
    .put(promotionsMgr.editPromotions);

}