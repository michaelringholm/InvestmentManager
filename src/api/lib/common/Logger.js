function Logger() {

	var _this = this;
	
	this.logInfo = function(msg) {
		console.log('[INFO]:' + msg);
	};

	this.logError = function(msg) {
		//console.error('[ERROR]:' + msg);
		console.error(new Error('[ERROR]:' + msg).stack);
	};
		
	this.logWarn = function(msg) {
		console.warn('[WARN]:' + msg);
	};
}


module.exports = new Logger(); // Singleton