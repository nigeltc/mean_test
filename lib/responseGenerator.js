var fs = require("fs");

exports.send404 = (res)=>{
    console.error("Resource not found.");
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Not found.");
};

exports.send500 = (data, res)=>{
    console.error(data.red);
    res.writeHead(500, {"Content-Type": "text/plain"});
    res.end(data);
};

exports.sendJSON = (data,res)=>{
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(JSON.stringify(data));
};

exports.makeSendFile = (path)=>{
    return (data, res)=>{
        data = data.replace(/^(\/home)(.html)?/i, "$1.html");
        data = "." + path + data;
        console.log("data = " + data);
        fs.stat(data, (err, stats)=>{
            if (err || stats.isDirectory()) {
                return exports.send404(res);
            }
            var readStream = fs.createReadStream(data);
            return readStream.pipe(res);
        });
    };
};
