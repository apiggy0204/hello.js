var http = require("http");
var url = require("url");

function start(route, handle) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for %s received.", pathname);

		
		request.setEncoding("utf8");
		
		var postData = "";
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk: %s", postDataChunk);
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});

		//route(handle, pathname, response);
		console.log("Received!");
	}).listen(8888);

	console.log("Server starts!");
}

exports.start = start;