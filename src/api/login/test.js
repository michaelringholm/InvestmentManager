var { Logger } = require("om-invest-lib");
var handler = require("./index.js");


console.log("Started...");
data = { }

var body = {
    userName: "demo-mike",
    password: "test"
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
