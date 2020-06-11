"use strict";

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};

// all the html pages
handle["/"] = requestHandlers.reqStart;
handle["/index"] = requestHandlers.reqStart;
handle["/detail"] =requestHandlers.reqDetail;
handle["/search"] =requestHandlers.reqSearch;
handle["/uploadPage"] = requestHandlers.reqUploadPage;

// functionality
handle["/upload"] = requestHandlers.reqUpload;
handle["/show"] = requestHandlers.reqShow;
handle["/style"] =requestHandlers.reqStyle;
// image for background
handle["/bgImg"] =requestHandlers.reqBg;

// Css form handlers
handle["/form1"] = requestHandlers.reqForm1;
handle["/form2"] = requestHandlers.reqForm2;
handle["/form3"] = requestHandlers.reqForm3;


server.startServer(router.route, handle);
