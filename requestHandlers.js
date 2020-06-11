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
function reqSearch(request, response) {
  console.log("Request handler 'detail' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./search.html").pipe(response);
}
function reqUploadPage(request, response) {
  console.log("Request handler 'detail' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./uploadPage.html").pipe(response);
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
function reqForm1(request,response){
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form1.css").pipe(response);
}
function reqForm2(request,response){
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form2.css").pipe(response);
}
function reqForm3(request,response){
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form3.css").pipe(response);
}
exports.reqShow = reqShow;
exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
exports.reqDetail = reqDetail;
exports.reqSearch = reqSearch;
exports.reqUploadPage = reqUploadPage;
exports.reqStyle = reqStyle;
exports.reqBg = reqBg;
exports.reqForm1 = reqForm1;
exports.reqForm2 = reqForm2;
exports.reqForm3 = reqForm3;