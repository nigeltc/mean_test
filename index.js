var http = require("http");

http.createServer((req, res)=>{
    var url;
    req.method = req.method.toUpperCase();
    console.log(req.method + " " + req.url);
    
    if (req.method !== "GET") {
        res.writeHead(501, {"Content-Type": "text/plain"});
        return res.end(req.method + " is not supported by this server.");
    }
    
    if ((url = /^\/employees$/i.exec(req.url))) {
        // return a list of employees
        res.writeHead(200, {"Content-Type": "text/plain"});
        return res.end("employee list");
    } else if ((url = /^\/employees\/(\d+)$/i.exec(req.url))) {
        // return a specific employee
        res.writeHead(200, {"Content-Type": "text/plain"});
        return res.end("single employee");
    } else {
        // static file
        res.writeHead(200, {"Content-Type": "text/plain"});
        return res.end("static file maybe?")
    }
}).listen(process.env.PORT, process.env.IP);
