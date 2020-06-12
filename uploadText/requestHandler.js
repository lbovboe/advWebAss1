const fs = require("fs");

const url = require("url");
var querystring = require("querystring");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;

function reqStart(request, response) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./start.html", "utf-8").pipe(response);
}

function reqUpload(request, response) {
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
          var csv = JSONToCSV(student, { fields: ["studentID", "fname"] });
          fs.writeFileSync("./student.csv", csv);
        });
    });
  }
  response.end();

  // var buffer = "";
  // request.on("data", function (chunk) {
  //   buffer = buffer + chunk;
  // });
  // request.on("end", function () {
  //  // var data = querystring.parse(buffer);
  //   fs.appendFile('student.txt',buffer, function (err) {
  //     if (err) throw err;
  //     console.log('Updated!');
  //   });

  //   response.end();
  // });
}

exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
