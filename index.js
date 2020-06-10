var router = require("./router");
var server = require("./server");
var handlers = require("./requestHandler");
var handle = {};

handle["/"] = handlers.reqStart;
handle["/start"] = handlers.reqStart;
handle["/upload"] = handlers.reqUpload;
server.startServer(41015, router.route, handle);
