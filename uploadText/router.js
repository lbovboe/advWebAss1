function route(pathname, handle, request, response) {
  console.log("Begin routing a request for"+ pathname);
  if (typeof handle[pathname] === "function") {
    handle[pathname](request, response);
  } else {
    console.log("no request handler found" + pathname);
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("resource not found");
    response.end();
  }
}

exports.route = route;
