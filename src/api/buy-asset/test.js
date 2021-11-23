var { Logger } = require("om-invest-lib");
var handler = require("./index.js");

console.log("Started...");

if(!process.env["accessToken"]) { console.error("Please initialize your environment by setting the env variable [accessToken] when running api methods locally. Consider calling login test method first."); return; }
var body = {
    accessToken: process.env["accessToken"],
    portfolioGuid: "1",
    asset: {
        isin: "asdas",
        amount: "10",
        guid: "dasldasldk"
    }
};

var request = { 
    requestContext: { http: { method:"POST" } },
    headers: { origin:"http://localhost" },
    headers: { referer:"http://localhost" },
    body: JSON.stringify(body)
};

handler.handler(request, null, (err, response) => {
    if(err) { console.error(err); throw(err); }
    /*console.log(response);
    var quote = JSON.parse(response.body).data.quote;
    console.log("quote="+JSON.stringify(quote));
    console.log("Done.");*/
});
