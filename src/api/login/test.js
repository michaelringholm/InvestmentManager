var { Logger } = require("om-invest-lib");
var handler = require("./index.js");


console.log("Started...");
if(!process.env["demoUserName"] || !process.env["demoPassword"]) { console.error("Please initialize your environment by setting the env variables [demoUserName] and [demoPassword]."); return; }

data = { }

var body = {
    userName: process.env["demoUserName"],
    password: process.env["demoPassword"]
};

var request = { 
    requestContext: { http: { method:"POST" } },
    headers: { origin:"http://localhost" },
    headers: { referer:"http://localhost" },
    body: JSON.stringify(body)
};

handler.handler(request, null, (err,response) => {
    if(err) console.error(err);
    console.log(response);
    console.log("Done.");
});
//new COM().Logger.warn("This is a warning!");
//new MMM();
//new FV.FieldVerifier().Verify(data, ["hero.heroName", "hero.heroClass2"]);
