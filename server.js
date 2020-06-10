"use strict";
const http = require('http');
const qs = require('querystring');
const url = require('url');
const version = 'L4E4';

function startServer(port,route,handle){
    function onRequest(request,response){
        let parsedUrl = url.parse(request.url);
        let path = parsedUrl.pathname;

        console.log(request.socket.remoteAddress + '|' +path + '|' + parsedUrl.query);
        route(path,handle,request,response);
    }

    let server = http.createServer(onRequest);
    server.listen(port);
}

exports.startServer = startServer;