function AppContext() {

	var _this = this;
	this.PREFIX = "om-invest-";
	this.DEFAULT_REGION = "eu-north-1";
	this.LOGIN_TABLE_NAME = this.PREFIX+"login";
	this.ALLOWED_ORIGINS = ["http://localhost", "http://aws..."];
}

module.exports = new AppContext(); // Singleton