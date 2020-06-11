"use strict";

var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
function reqStart(request, response) {
  function onFileLoad(err, fileData) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fileData);
    response.end();
  }
  console.log("request start was called");
  fs.readFile("index.html", onFileLoad);
}
function reqUpload(request, response) {
  console.log("Request handler 'upload' was called.");
  console.log("...about to parse...");
  var form = new formidable.IncomingForm();
  form.uploadDir = "./tmp";
  form.parse(request, function (err, field, file) {
    console.log("parsing done");

    fs.rename(file.upload.path, "./test.png", function (err) {
      if (err) {
        fs.unlink("./test.png");
        fs.rename(file.upload.path, "./test.png");
      }
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}
function reqShow(request, response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, { "Content-Type": "image/png" });
  fs.createReadStream("./test.png").pipe(response);
}
function reqDetail(request, response) {
  console.log("Request handler 'detail' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./detail.html").pipe(response);
}
function reqStyle(request,response){
  console.log("Request handler 'style' was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./style.css").pipe(response);
}
function reqBg(request,response){
  console.log("Request handler 'bgImg' was called.");
  response.writeHead(200, { "Content-Type": "image/png" });
  fs.createReadStream("./bgImg.png").pipe(response);
}
exports.reqShow = reqShow;
exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
exports.reqDetail = reqDetail;
exports.reqStyle = reqStyle;
exports.reqBg = reqBg;