function AppContext() {

	var _this = this;
	this.PREFIX = "om-invest-";
	this.LOGIN_TABLE_NAME = this.PREFIX+"login";
	this.ALLOWED_ORIGINS = ["http://localhost", "http://aws..."];
}

module.exports = new AppContext(); // Singleton