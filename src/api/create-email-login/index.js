const AWS = require("aws-sdk");
var INVEST_LIB = require("om-invest-lib");
var { Logger } = require("om-invest-lib");
var { LoginDAO } = require("om-invest-lib");
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
        //if(!requestInput.accessToken) throw new Error("Access token missing!");
        var loginDTO = await LoginDAO.createLoginAsync(requestInput.email, requestInput.password, requestInput.passwordRepeat);
        HttpController.respondOK(origin, {login:loginDTO}, callback);
    }
    catch(ex) { Logger.logError(ex.stack); HttpController.respondError(origin, 500, ex.toString(), callback); return }    
};