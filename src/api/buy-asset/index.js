const AWS = require("aws-sdk");
const FV = require('./field-verifier.js');
var INVEST_LIB = require("om-invest-lib");
var { Logger } = require("om-invest-lib");
var { LoginDAO } = require("om-invest-lib");
var { AssetDAO } = require("om-invest-lib");
var { PortfolioBO } = require("om-invest-lib");
var { HttpController } = require("om-invest-lib");

// Callback is (error, response)
exports.handler = async function(event, context, callback) {
    Logger.logInfo(JSON.stringify(event));
    if(AWS.config.region == null) AWS.config.update({region: 'eu-north-1'});
    var method = event.requestContext.http.method;
    var origin = event.headers.origin;
    var referer = event.headers.referer;
    Logger.logInfo("method="+method);
    if(method == "OPTIONS") { HttpController.preFlightResponse(origin, referer, callback); return; }
    var requestInput = JSON.parse(event.body);
    try {
        if(!requestInput.accessToken) throw new Error("Access token missing!");
        if(!requestInput.asset.guid) throw new Error("Asset ID is missing!");
        //var loginDTO = await LoginDAO.getByTokenAsync(requestInput.accessToken);
        //Logger.logInfo("loginDTO="+JSON.stringify(loginDTO));
        var portfolio = await PortfolioBO.buyAsset(requestInput.portfolioGuid, requestInput.asset); //await PortfolioDAO.store(requestInput.assetGuid);
        HttpController.respondOK(origin, {portfolio:portfolio}, callback);
    }
    catch(ex) { Logger.logError(ex.stack); HttpController.respondError(origin, 500, ex.toString(), callback); return }    
};

