var Logger = require('../common/Logger.js');
var appContext = require('../common/AppContext.js');
var FV = require('../common/field-verifier.js');
var PortfolioDAO = require('./PortfolioDAO.js');
var AWS = require("aws-sdk");
var CONSTS = require('../common/Constants.js');

function PortfolioBO() {
	var _this = this;
	var bucketName = appContext.PREFIX+"portfolio-s3";
	this.s3 = new AWS.S3();
	if(AWS.config.region == null) AWS.config.update({region: 'eu-north-1'});

    this.buyAsset = async function(portfolioGuid, asset) {
		Logger.logInfo("PortfolioBO.saveDetailsAsync");
		if(portfolioGuid && asset) {
			var fileName = "portfolio-" + portfolioGuid + ".json";
			var portfolioDTO = await PortfolioDAO.getAsync(portfolioGuid);
			var existingAsset = portfolioDTO.assets(a => a.assetGuid == asset.guid);
			existingAsset.amount += asset.amount;
			await PortfolioDAO.setAsync(portfolioGuid, portfolioDTO);
			return new Promise( (resolve, reject) => {
				_this.s3.putObject(params, function(err, data) {
					if (err) { Logger.logError("save:"+err, err.stack); reject(err); return; }
					//Logger.logInfo(data);
					resolve(true);
				});
			});
		}
		else
			Logger.logError("Asset was null, unable to buy asset!");
	};	

	this.construct = function() {
		Logger.logInfo("PortfolioBO.construct");
  	};
  
  _this.construct();
}

module.exports = new PortfolioBO();