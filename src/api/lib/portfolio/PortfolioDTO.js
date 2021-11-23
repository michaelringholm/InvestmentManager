var _logger = require('../common/Logger.js');
var CONSTS = require('../common/Constants.js');

module.exports = function PortfolioDTO(anonObj) {	
	var _this = this;
	this.guid = "";
	this.assets = [];	
			
	this.construct = function() {
		_logger.logInfo("PortfolioDTO.construct");
    	for (var prop in anonObj) this[prop] = anonObj[prop];
  	};
  
  _this.construct();
}