'use strict';
var adsMgr  = require('./ads/adsMgr');
var bannersMgr = require('./banner/bannerMgr');
var promotionsMgr = require('./promotions/promotionsMgr');
var footerMgr = require('./footer/footerMgr');
var templateMgr = require('./template/templateMgr');
var headerMgr = require('./header/headerMgr');

module.exports = function(app) {

    // ads 
    app.route('/ads/:position')
    .put(adsMgr.createAds);

    app.route('/deleteads/:id')
    .delete(adsMgr.deleteAds);

    app.route('/ads')
    .get(adsMgr.getAds);

    app.route('/categorytoapprove')
    .get(adsMgr.getUnApprovedCategory);  

    app.route('/approvedCategory')
    .get(adsMgr.approvedCategory);
    
    app.route('/approveCategory/:id')
    .get(adsMgr.approveCategory);  // ads(category content)

    // banners

    app.route('/banners/:position')
    .put(bannersMgr.createBanners);

    app.route('/deletebanners/:id')
    .delete(bannersMgr.deleteBanners);

    app.route('/banners')
    .get(bannersMgr.getBanners);

    app.route('/bannerstoapprove')
    .get(bannersMgr.getUnApprovedBanners);

    // give banner approval 

    app.route('/approvebanner/:id')
    .get(bannersMgr.approveBanner);

    app.route('/approvedbanner')
    .get(bannersMgr.approvedBanner);

    // promotions
    app.route('/promotions')
    .post(promotionsMgr.createPromotions);

    app.route('/deletepromotions/:id')
    .delete(promotionsMgr.deletePromotions);

    app.route('/promotions')
    .get(promotionsMgr.getPromotions);


   app.route('/promotionstoapprove')
    .get(promotionsMgr.getUnApprovedPromotions);
    
    app.route('/singlepromotions')
    .get(promotionsMgr.getSinglePromotions);

    app.route('/approvepromotions/:id')
    .get(promotionsMgr.approvePromotions);

    app.route('/approvedpromotions')
    .get(promotionsMgr.approvedPromotions);

    app.route('/editpromotions/:id')
    .put(promotionsMgr.editPromotions);

    // footer 

    app.route('/footer')
    .post(footerMgr.createFooter);

    app.route('/createLogoImage/:id')
    .put(footerMgr.createLogoImage);


    app.route('/footerDetails')
    .get(footerMgr.getFooterDetails);

    app.route('/details/:id')
    .put(footerMgr.updateFooterDetails);

    // template 

    app.route('/createTemplateImage')
    .post(templateMgr.createTemplateImage);

    app.route('/templateImages')
    .get(templateMgr.getTemplateImages);

     // header 
     app.route('/createLogoImage')
     .post(headerMgr.createLogoImage);

     app.route('/headerDetails')
     .get(headerMgr.getHeaderDetails);

     app.route('/headerstoapprove')
     .get(headerMgr.getUnApprovedHeader);

     app.route('/approveheader/:id')
    .get(headerMgr.approveHeader);

    app.route('/approvedheader')
    .get(headerMgr.getApprovedHeader);
}