const AWS = require("aws-sdk");
const FV = require('./field-verifier.js');
var INVEST_LIB = require("om-invest-lib");
var { Logger } = require("om-invest-lib");
var { LoginDAO } = require("om-invest-lib");
var { AssetCategoryDAO } = require("om-invest-lib");
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
        //var loginDTO = await LoginDAO.getByTokenAsync(requestInput.accessToken);
        //Logger.logInfo("loginDTO="+JSON.stringify(loginDTO));
        var assetCategories = await AssetCategoryDAO.getAllAsync();
        /*var heroDTO = await HeroDAO.getAsync(loginDTO.userGuid, loginDTO.activeHeroName);
        heroDTO.heroKey = loginDTO.userGuid+"#"+heroDTO.heroName;
        var battleDTO = await BattleDAO.loadAsync(heroDTO.heroKey);        
        var battle = new Battle(battleDTO);
        await battle.lootCorpseAsync(loginDTO.userGuid, heroDTO.heroKey);
        var mapDTO = await MapCache.getMapAsync(heroDTO.currentMapKey);
        var map = new MidgaardMainMap(mapDTO);
        var location = map.getLocation(heroDTO.currentCoordinates);*/
        HttpController.respondOK(origin, {assetCategories:assetCategories}, callback);
    }
    catch(ex) { Logger.logError(ex.stack); HttpController.respondError(origin, 500, ex.toString(), callback); return }    
};

