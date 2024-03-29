var Logger = require('../common/Logger.js');
var appContext = require('../common/AppContext.js');
var FV = require('../common/field-verifier.js');
var HeroDTO = require('./AssetCategoryDTO.js');
var AWS = require("aws-sdk");
var CONSTS = require('../common/Constants.js');

function AssetDAO() {
	var _this = this;
	var bucketName = appContext.PREFIX+"asset-s3";
	this.s3 = new AWS.S3();
	if(AWS.config.region == null) AWS.config.update({region: 'eu-north-1'});
	
	this.getAllAsync = async function() {
		Logger.logInfo("AssetDAO.getAll");
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

	this.getAsync = async function(assetGuid) {
		Logger.logInfo("AssetDAO.getAsync");
		var fileName = "assets.json";
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
				// TODO: Filter on guid
				resolve(data);
			});		
		});
	};

	this.getLatestQuoteAsync = async function(assetGuid) {
		Logger.logInfo("AssetDAO.getAsync");
		var fileName = "asset-quotes.json";
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
				var quotes = JSON.parse(s3Object.Body.toString());
				var quote = quotes.filter(q => q.guid > assetGuid)[0];
				resolve(quote);
			});		
		});
	};	

	this.existsAsync = async function(fileName) {
		Logger.logInfo("AssetDAO.exists");
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

	/*this.exists = function(fileName, callback) {
		Logger.logInfo("AssetCategoryDAO.exists");
		_this.s3.listObjectsV2(
			{
				Bucket: bucketName,
				Prefix: fileName
			}, 
			(err, s3Objects) => 
			{
				if (err) { Logger.logError("exists:"+err, err.stack); callback(err, false); return; }				
				Logger.logInfo("Objects in bucket are [" + JSON.stringify(s3Objects) + "]");
				if(s3Objects.KeyCount<1) { callback(null, false); return; }
				for(var i=0; i<s3Objects.Contents.length;i++) {					
					if(s3Objects.Contents[i].Key == fileName) { callback(null, true); return; }
				}
				callback(null, s3Objects.KeyCount==1);
				return;
			}
		);
	};

	this.saveAsync = async function(userGuid, heroDTO) {
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
	}	
	
	var saveToDBAsync = async function(assetCategoryGuid, assetCategoryDTO) {
		Logger.logInfo("AssetCategoryDAO.saveToDBAsync()");
		if(!assetCategoryGuid) { Logger.logError("Missing field [assetCategoryGuid]."); throw new Error("Missing field [assetCategoryGuid]."); }
		var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
		var params = {
			TableName: appContext.ASSET_CATEGORY_TABLE_NAME,
			Item: {
			  'assetCategoryGuid': {S: assetCategoryGuid},
			  'assetCategoryName': {S: assetCategoryDTO.assetCategoryName}
			},
			ReturnConsumedCapacity: "TOTAL", 
		};    
		return new Promise((resolve, reject) => {
			ddb.putItem(params, function(err, newAssetCategoryData) {
				if (err) { Logger.logInfo(err); reject(err); return; }
				else {       
					var newAssetCategoryItem = AWS.DynamoDB.Converter.unmarshall(newAssetCategoryData); // Seems only new fields are in Dynamo format
					var assetCategoryDTO = new AssetCategoryDTO(newAssetCategoryItem);
					resolve(assetCategoryDTO);
				}
			});   
		}); 
	}	

	this.save = function(userGuid, heroDTO, callback) {
		if(!userGuid) { Logger.logError("Missing field [userGuid]."); callback("Missing field [userGuid].", null); return; }
		var missingFields = new FV.FieldVerifier().Verify(heroDTO, ["heroName","heroClass"]); if(missingFields.length > 0) { callback("Missing fields:" + JSON.stringify(missingFields), null); return; }
		var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
		var params = {
			TableName: appContext.HERO_TABLE_NAME,
			Item: {
			  'userGuid': {S: userGuid},
			  'heroName': {S: heroDTO.heroName},
			  'heroClass': {S: heroDTO.heroClass},
			  'gender': {S: heroDTO.gender}
			},
			ReturnConsumedCapacity: "TOTAL", 
			//ProjectionExpression: 'ATTRIBUTE_NAME'
		};    
		ddb.putItem(params, function(err, newHeroData) {
			if (err) { Logger.logInfo(err); callback(err, null); }
			else {       
				var heroKey = userGuid+"#"+heroDTO.heroName;
				_this.saveDetails(heroKey, heroDTO, (err, data) => {
					if (err) { Logger.logInfo(err); callback(err, null); return; }
					Logger.logInfo("Hero created");
					Logger.logInfo("newHeroData JSON [" + JSON.stringify(newHeroData) + "] created!");
					var newHeroItem = AWS.DynamoDB.Converter.unmarshall(newHeroData); // Seems only new fields are in Dynamo format
					var heroDTO = new HeroDTO(newHeroItem);
					callback(null, heroDTO);
				});
			}
		});    
	}	
	
	this.get = function(userGuid, heroName, callback) {
		Logger.logInfo("AssetCategoryDAO.get()");
		if(!userGuid) { Logger.logError("Missing field [userGuid]."); callback("Missing field [userGuid].", null); return; }
		if(!heroName) { Logger.logError("Missing field [heroName]."); callback("Missing field [heroName].", null); return; }
		//AWS.config.update({region: 'eu-central-1'});
		var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
		Logger.logInfo("Calling AssetCategoryDAO.get() via statement...");
		
		ddb.query(
			{
				TableName: appContext.HERO_TABLE_NAME,
				KeyConditionExpression: "userGuid = :userGuid and heroName = :heroName", // "userGuid = :userGuid and heroName = :heroName",
				ExpressionAttributeValues: {
					":userGuid": {S: userGuid},
					":heroName": {S: heroName},            
				}
			},
			(err, heroData) => {
				if(err) { callback(err, null); return; }
				Logger.logInfo("Got these data via statement:");
				Logger.logInfo(JSON.stringify(heroData));
				var heroItem = AWS.DynamoDB.Converter.unmarshall(heroData.Items[0]); // Seems only new fields are in Dynamo format
				Logger.logInfo("Hero [" + userGuid + "#" + heroName + "] loaded!");
				var heroKey = userGuid+"#"+heroName;
				_this.loadDetails(heroKey, (err, heroDTO) => {
					if (err) { Logger.logInfo(err); callback(err, null); return; }
					//if(!jsonData) { callback("No json data found for hero."); return; }
					//heroDTO = new HeroDTO(JSON.parse(jsonData));
					//heroDTO.isInBattle = heroItem.isInBattle; // IMPORTANT
					Logger.logInfo("HeroDTO:");
					Logger.logInfo(JSON.stringify(heroDTO));
					callback(null, heroDTO);
				});
			}
		);
	};

	var getFromDBAsync = async function(assetCategoryGuid, assetCategoryName) {
		Logger.logInfo("AssetCategoryDAO.getFromDBAsync()");
		if(!assetCategoryGuid) { Logger.logError("Missing field [assetCategoryGuid]."); callback("Missing field [assetCategoryGuid].", null); return; }
		if(!assetCategoryName) { Logger.logError("Missing field [assetCategoryName]."); callback("Missing field [assetCategoryName].", null); return; }
		var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
		Logger.logInfo("Calling AssetCategoryDAO.get() via statement...");
		
		return new Promise((resolve, reject) => {
			ddb.query(
				{
					TableName: appContext.HERO_TABLE_NAME,
					KeyConditionExpression: "assetCategoryGuid = :assetCategoryGuid and assetCategoryName = :assetCategoryName",
					ExpressionAttributeValues: {
						":assetCategoryGuid": {S: assetCategoryGuid},
						":assetCategoryName": {S: assetCategoryName},            
					}
				},
				(err, assetCategoryData) => {
					if(err) reject(err);
					Logger.logInfo("Got these data via statement:");
					Logger.logInfo(JSON.stringify(assetCategoryData));
					var assetCategoryItem = AWS.DynamoDB.Converter.unmarshall(assetCategoryData.Items[0]);
					resolve(assetCategoryItem);
				}
			);
		});
	};

	this.getAsync = async function(userGuid, heroName) {
		Logger.logInfo("AssetCategoryDAO.getAsync()");
		if(!userGuid) { Logger.logError("Missing field [userGuid]."); throw new Error("Missing field [userGuid]."); }
		if(!heroName) { Logger.logError("Missing field [heroName]."); throw new Error("Missing field [heroName]."); }
		var heroKey = userGuid+"#"+heroName;
		//var heroItem = await _this.getFromDBAsync(userGuid, heroName);
		var heroDTO = await _this.loadDetailsAsync(heroKey);
		Logger.logInfo("HeroDTO:");
		Logger.logInfo(JSON.stringify(heroDTO));
		return heroDTO;		
	};	
	
	this.loadDetails = function(heroKey, callback) {
		Logger.logInfo("AssetCategoryDAO.load");
		var fileName = "hero-" + heroKey + ".json";
		this.exists(fileName, (err, exists)=> {
			if (err) { callback(err, false); return; }
			if (!exists) { callback("Hero details file [" + fileName + "] does not exist!", null); return; }
			var params = {
				Bucket: bucketName, 
				Key: fileName
			};

			_this.s3.getObject(params, function(err, s3Object) {
				if (err) { Logger.logError(err, err.stack); callback(err, null); return; }								
				Logger.logInfo("HeroJson=" + JSON.stringify(s3Object.Body.toString()));
				var heroDTO = JSON.parse(s3Object.Body.toString());
				callback(null, heroDTO);
			});		
		});
	};

	this.loadDetailsAsync = async function(heroKey) {
		Logger.logInfo("AssetCategoryDAO.load");
		var fileName = "hero-" + heroKey + ".json";
		var exists = this.existsAsync(fileName);
		if (!exists) throw new Error("Hero details file [" + fileName + "] does not exist!", null);

		var params = {
			Bucket: bucketName, 
			Key: fileName
		};
		return new Promise((resolve, reject) => {
			_this.s3.getObject(params, function(err, s3Object) {
				if (err) { Logger.logError(err, err.stack); reject(err); }
				Logger.logInfo("HeroJson=" + JSON.stringify(s3Object.Body.toString()));
				var heroDTO = JSON.parse(s3Object.Body.toString());
				resolve(heroDTO);
			});		
		});
	};	

	var patchHero = function(heroDTO) {
		Logger.logInfo("AssetCategoryDAO.patchHero");
		if(!heroDTO.gender) { Logger.logInfo("Patching gender..."); heroDTO.gender = CONSTS.GENDERS.FEMALE; }
		return heroDTO;
	};

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
	
	this.saveDetails = function(heroKey, heroDTO, callback) {
		Logger.logInfo("AssetCategoryDAO.save");
		if(!callback) { Logger.logWarn("AssetCategoryDAO.save called with undefined callback!"); return; }
		if(heroDTO) {
			var fileName = "hero-" + heroKey + ".json";
			patchHero(heroDTO);			
			Logger.logInfo("Hero after patching=["+JSON.stringify(heroDTO)+"]");
			this.exists(fileName, (err, exists)=> {
				if (err) { Logger.logError("load:"+err, err.stack); callback(err, false); return; }
				//if (!exists) { callback("Hero details file [" + fileName + "] does not exist!", null); return; }
				var params = {
					Body: JSON.stringify(heroDTO),
					Bucket: bucketName, 
					Key: fileName
				};
				Logger.logInfo("AssetCategoryDAO.saveDetails(1)");			
				_this.s3.putObject(params, function(err, data) {
					if (err) { Logger.logError("save:"+err, err.stack); callback(err, null); return; }
					Logger.logInfo("AssetCategoryDAO.saveDetails(2)");
					Logger.logInfo(data);
					callback(null, true);
				});
				var updateTime = new Date();
			});
		}
		else
			Logger.error("hero was null, not saving!");
	};*/	
	
	this.construct = function() {
		Logger.logInfo("AssetDAO.construct");
  	};
  
  _this.construct();
}

module.exports = new AssetDAO();