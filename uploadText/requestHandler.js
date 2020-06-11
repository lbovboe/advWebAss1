const fs = require("fs");

function reqStart(request, response) {
  
  function onFileLoad(err, fileData) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fileData);
    response.end();
  }
  console.log("request start was called");
  fs.readFile("client/index.html", onFileLoad);
}

function reqUpload(request, response) {
  console.log("request upload eas called");
  if (request.method == "GET") {
    return reqStart(request, response);
  }
  var buffer = "";
  request.addListener("data", function (chunk) {
    buffer = buffer + chunk;
  });
  request.addListener("end", function () {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("you have sent: " + buffer);
    response.end();
  });
}

exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
