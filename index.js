"use strict";

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};

handle["/"] = requestHandlers.reqStart;
handle["/index"] = requestHandlers.reqStart;
handle["/upload"] = requestHandlers.reqUpload;
handle["/show"] = requestHandlers.reqShow;
handle["/detail"] =requestHandlers.reqDetail;
handle["/style"] =requestHandlers.reqStyle;
handle["/bgImg"] =requestHandlers.reqBg;
handle["/form1"] = requestHandlers.reqForm1;
handle["/form2"] = requestHandlers.reqForm2;
handle["/form3"] = requestHandlers.reqForm3;

server.startServer(router.route, handle);
