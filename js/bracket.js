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

			var jsonParsed = self.parseData(data);
			var obj = {
				title: data.id + " Tournament",
				summary: data.info.summary,
				game: data.info.game,
				type: "Elimination",
				currentSize: data.info.currentSize,
				maxSize: data.info.maxSize
			}
			
			jsonParsed.push(obj);
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
		for (var i = 0; i < json.info.maxSize; i++) {
			if (json.users.length > i)
				temp2.push(json.users[i].name);
			else
				temp2.push("_________________");
		}
		for (var i = 0; i < temp2.length-1; i++) {
			temp = {
				"round": i+1,
				"users": temp2[i] + ' versus ' + temp2[i+1] + '\n'
			}
			data.push(temp);
		}
		return data;
	}
}