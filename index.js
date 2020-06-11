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

server.startServer(router.route, handle);
