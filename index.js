var http = require("http");
var employeeService = require("./lib/employees");
var responder = require("./lib/responseGenerator");
var sendFile = responder.makeSendFile("/public/");

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
        employeeService.getEmployees((err, data)=>{
            if (err) {
                return responder.send500(err, res);
            }
            responder.sendJSON(data, res);
        });
    } else if ((url = /^\/employees\/(\d+)$/i.exec(req.url))) {
        // return a specific employee
        employeeService.getEmployee(url[1], (err, data)=>{
            if (err) {
                return responder.send500(err, res);
            }
            
            if (!data) {
                return responder.send404(res);
            }
            
            return responder.sendJSON(data, res);
        });
    } else {
        url = /^\/employees\/(.+)$/i.exec(req.url)
        // static file
        res.writeHead(200);
        //return res.end("static file maybe?");
        console.log("Sending " + url[1]);
        return sendFile(url[1], res);
    }
}).listen(process.env.PORT, process.env.IP);
