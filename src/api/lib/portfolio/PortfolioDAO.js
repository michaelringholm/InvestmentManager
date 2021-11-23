var Logger = require('../common/Logger.js');
var appContext = require('../common/AppContext.js');
var FV = require('../common/field-verifier.js');
var HeroDTO = require('./AssetCategoryDTO.js');
var AWS = require("aws-sdk");
var CONSTS = require('../common/Constants.js');

function PortfolioDAO() {
	var _this = this;
	var bucketName = appContext.PREFIX+"asset-s3";
	this.s3 = new AWS.S3();
	if(AWS.config.region == null) AWS.config.update({region: 'eu-north-1'});

    var saveDetailsAsync = async function(heroKey, heroDTO) {
		Logger.logInfo("AssetCategoryDAO.saveDetailsAsync");
		if(heroDTO) {
			var fileName = "hero-" + heroKey + ".json";
			patchHero(heroDTO);			
			Logger.logInfo("Hero after patching=["+JSON.stringify(heroDTO)+"]");
			//var exists = this.existsAsync(fileName);
			//if (!exists) { callback("Hero details file [" + fileName + "] does not exist!", null); return; }			
			var params = {
				Body: JSON.stringify(heroDTO),
				Bucket: bucketName, 
				Key: fileName
			};
			return new Promise((resolve, reject) => {
				_this.s3.putObject(params, function(err, data) {
					if (err) { Logger.logError("save:"+err, err.stack); reject(err); return; }
					//Logger.logInfo(data);
					resolve(true);
				});
			});
		}
		else
			Logger.error("hero was null, not saving!");
	};	    
	
	this.getAllAsync = async function() {
		Logger.logInfo("AssetCategoryDAO.getAll");
		var fileName = "asset-categories.json";
		var exists = this.existsAsync(fileName);
		if (!exists) throw new Error("File [" + fileName + "] does not exist!", null);

		var params = {
			Bucket: bucketName, 
			Key: fileName
		};
		return new Promise((resolve, reject) => {
			_this.s3.getObject(params, function(err, s3Object) {
				if (err) { Logger.logError(err, err.stack); reject(err); }
				Logger.logInfo("Data=" + JSON.stringify(s3Object.Body.toString()));
				var data = JSON.parse(s3Object.Body.toString());
				resolve(data);
			});		
		});
	};

	this.getAsync = async function(assetCategoryId) {
		Logger.logInfo("AssetCategoryDAO.getAsync");
		var fileName = "asset-category-" + assetCategoryId + ".json";
		var exists = this.existsAsync(fileName);
		if (!exists) throw new Error("File [" + fileName + "] does not exist!", null);

		var params = {
			Bucket: bucketName, 
			Key: fileName
		};
		return new Promise((resolve, reject) => {
			_this.s3.getObject(params, function(err, s3Object) {
				if (err) { Logger.logError(err, err.stack); reject(err); }
				Logger.logInfo("Data=" + JSON.stringify(s3Object.Body.toString()));
				var heroDTO = JSON.parse(s3Object.Body.toString());
				resolve(heroDTO);
			});		
		});
	};		

	this.existsAsync = async function(fileName) {
		Logger.logInfo("AssetCategoryDAO.exists");
		return new Promise((resolve, reject) => {
			_this.s3.listObjectsV2(
				{
					Bucket: bucketName,
					Prefix: fileName
				}, 
				(err, s3Objects) => 
				{
					if (err) { Logger.logError("exists:"+err, err.stack); reject(err); }
					Logger.logInfo("Objects in bucket are [" + JSON.stringify(s3Objects) + "]");
					if(s3Objects.KeyCount<1) { resolve(false); return; }
					for(var i=0; i<s3Objects.Contents.length;i++) {					
						if(s3Objects.Contents[i].Key == fileName) resolve(true);
					}
					resolve(s3Objects.KeyCount==1);
				}
			);
		});
	};

	/*this.saveAsync = async function(userGuid, heroDTO) {
		Logger.logInfo("AssetCategoryDAO.saveAsync()");
		if(!userGuid) { Logger.logError("Missing field [userGuid]."); throw new Error("Missing field [userGuid].", null); }
		var missingFields = new FV.FieldVerifier().Verify(heroDTO, ["heroName","heroClass"]); if(missingFields.length > 0) { throw new Error("Missing fields:" + JSON.stringify(missingFields)); }
		var newHeroData = await saveToDBAsync(userGuid, heroDTO);
		var heroKey = userGuid+"#"+heroDTO.heroName;
		await saveDetailsAsync(heroKey, heroDTO);
		Logger.logInfo("Hero created");
		Logger.logInfo("newHeroData JSON [" + JSON.stringify(newHeroData) + "] created!");
		var newHeroItem = AWS.DynamoDB.Converter.unmarshall(newHeroData); // Seems only new fields are in Dynamo format
		var heroDTO = new HeroDTO(newHeroItem);
		return heroDTO;
	}*/	
	
	this.construct = function() {
		Logger.logInfo("PortfolioDAO.construct");
  	};
  
  _this.construct();
}

module.exports = new PortfolioDAO();