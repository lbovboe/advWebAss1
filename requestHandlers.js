"use strict";

var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;

function reqStart(request, response) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./index.html", "utf-8").pipe(response);
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
function reqCsv(request, response) {
  console.log("request upload eas called");
  if (request.method == "GET") {
    //return reqStart(request, response);
    var q = url.parse(request.url, true).query;
    console.log(q);
  } else if (request.method == "POST") {
    var data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", function () {
      var formdata = querystring.parse(data);
      console.log(formdata);
      CSVToJSON()
        .fromFile("./student.csv")
        .then((student) => {
          student.push(formdata);
          var csv = JSONToCSV(student, {
            fields: ["studentID", "fname", "lname", "age", "gender", "degree"],
          });
          fs.writeFileSync("./student.csv", csv);
        });
    });
  }
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Record updated to student.csv ! <br/>");
  response.end();
}
function reqSearchInfo(request, response) {
  console.log("request upload eas called");
  if (request.method == "GET") {
    //return reqStart(request, response);
    var q = url.parse(request.url, true).query;
    console.log(q);
  } else if (request.method == "POST") {
    var data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", function () {
      var formdata = querystring.parse(data);

      console.log(typeof formdata);
      console.log(formdata);
      var arr = Object.entries(formdata);
      console.log(arr[0][1]);
      var searchDegree = arr[0][1].toLowerCase();
      var count = 0;
      response.writeHead(200, { "Content-Type": "text/plain" });
      CSVToJSON()
        .fromFile("student.csv")
        .then((student) => {
          // users is a JSON array
          // log the JSON array
          //console.log(student);
          //console.log(student.indexOf("CAI"));
          var index = student.findIndex(function (info, index) {
            if (info.degree === searchDegree) {
              var result = JSON.stringify(student[index]);
              console.log(result);
              count ++;
              response.write(result);
            }
          });
          if(count == 0){
            response.write("There's no result found!");
          }else{
            response.write("\n total number of matches " + count);
          }
          response.end();
          //console.log(index);
          // console.log(student[index]);
        })
        .catch((err) => {
          // log error if any
          console.log(err);
        });
    });
  }
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

function reqStyle(request, response) {
  console.log("Request handler 'style' was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./style.css").pipe(response);
}
function reqBg(request, response) {
  console.log("Request handler 'bgImg' was called.");
  response.writeHead(200, { "Content-Type": "image/png" });
  fs.createReadStream("./bgImg.png").pipe(response);
}
function reqForm1(request, response) {
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form1.css").pipe(response);
}
function reqForm2(request, response) {
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form2.css").pipe(response);
}
function reqForm3(request, response) {
  console.log("Request handler 'form1 ' for css was called.");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.createReadStream("./form3.css").pipe(response);
}
exports.reqShow = reqShow;
exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
exports.reqCsv = reqCsv;
exports.reqSearchInfo = reqSearchInfo;
exports.reqDetail = reqDetail;
exports.reqSearch = reqSearch;
exports.reqUploadPage = reqUploadPage;
exports.reqStyle = reqStyle;
exports.reqBg = reqBg;
exports.reqForm1 = reqForm1;
exports.reqForm2 = reqForm2;
exports.reqForm3 = reqForm3;
