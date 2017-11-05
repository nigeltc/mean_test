var http = require("http");

http.createServer((req, res)=>{
    var url;
    req.method = req.method.toUpperCase();
    console.log(req.method + " " + req.url);
    res.end("The current time is " + Date.now());
}).listen(process.env.PORT, process.env.IP);
