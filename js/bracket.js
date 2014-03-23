var fs = require('fs'),
	Mustache = require('mustache'),
	parse = require('./parse.js');

module.exports = {
	build: function(request, response) {
		var jsonName = request.url.substring(1,request.url.indexOf('.')) + '.json';
		var self = this;
		fs.readFile("./tournaments/"+jsonName, function(err, data) {
			if (err) throw err;
			try {
			data = JSON.parse(data);
			} catch (e) {
				console.log("JSON.parse failed, resorting to eval.");
				data = eval( "(" + data + ")" );
			}
			console.log(data);
			var jsonParsed = self.parseData(data);

			parse.build(jsonParsed, "/Template/template-brackets.html",
						"template-round", "/html/template-brackets-index.html",
						"bracket", response);
		});
	},
	parseData: function(json) {
		var rounds = json["bracket"]["rounds"].length;
		var data = [];
		var temp = {};
		var temp2 = [];
		for (var a in json["users"]) {
			temp2.push(json["users"].a.name);
			console.log(json["users"].a);
		}
		for (var i = 0; i < temp2.length-1; ++i) {
			temp = {
				"round": i+1,
				"users": temp2[i]["name"] + ' versus ' + temp2[i+1]["name"] + '\n'
			}
			data.push(temp);
		}
		return data;
	}
}