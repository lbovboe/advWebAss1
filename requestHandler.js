const exec = require("child_process").exec;

const fs = require("fs");

function writeHeaders(response, code) {
  response.writeHead(code, { "Content-Type": "text/html" });
}

function reqStart(request, response) {
  var statusCode = 200;
  function onFileLoad(err, fileData) {
    writeHeaders(response, statusCode);
    response.write(fileData);
    response.end();
  }
  console.log("request start was called");
  fs.readFile("start.html", onFileLoad);
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
