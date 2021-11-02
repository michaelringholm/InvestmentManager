var _logger = require('../common/Logger.js');

module.exports = function Hero(anonObj) {
	var _this = this;
	this.heroName = "";
			
	this.construct = function() {
		_logger.logInfo("HeroDTO.construct");
    	for (var prop in anonObj) this[prop] = anonObj[prop];
  	};
  
  _this.construct();
}