var _logger = require('../common/Logger.js');
var CONSTS = require('../common/Constants.js');

module.exports = function AssetCategoryDTO(anonObj) {	
	var _this = this;
	this.heroName = "";
	this.heroId = "";	
			
	this.construct = function() {
		_logger.logInfo("AssetCategoryDTO.construct");
    	for (var prop in anonObj) this[prop] = anonObj[prop];
  	};
  
  _this.construct();
}