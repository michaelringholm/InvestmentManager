var { Logger } = require("om-invest-lib");
var handler = require("./index.js");

console.log("Started...");

if(!process.env["accessToken"]) { console.error("Please initialize your environment by setting the env variable [accessToken] when running api methods locally. Consider calling login test method first."); return; }
var body = {
    accessToken: process.env["accessToken"],
    assetCategoryID: "1"
};

var request = { 
    requestContext: { http: { method:"POST" } },
    headers: { origin:"http://localhost" },
    headers: { referer:"http://localhost" },
    body: JSON.stringify(body)
};

handler.handler(request, null, (err, response) => {
    if(err) console.error(err);
    console.log(response);
    var assetCategory = JSON.parse(response.body).data.assetCategory;
    console.log("assetCategory="+JSON.stringify(assetCategory));
    console.log("Done.");
});
