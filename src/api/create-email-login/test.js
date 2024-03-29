var { Logger } = require("om-invest-lib");
var handler = require("./index.js");
//var MAP = require("om-hq-map");


console.log("Started...");

var body = {
    email: process.env["demoEmail"],
    password: process.env["demoPassword"],
    passwordRepeat: process.env["demoPassword"]
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
    console.log("Done.");
});
