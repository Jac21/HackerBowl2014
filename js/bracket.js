var fs = require('fs'),
	parse = require('./parse.js');

module.exports = {
	build: function(request, response) {
		// open correct json
		// parse json
		// send parse.build(obj, num, templateHtml, templateID, html, divID, response)

		parse.build([{"round": 1, "names": "name!"}], "/Template/template-brackets.html", "template-round", "/html/template-brackets-index.html", "bracket", response);
		
	},
	parseData: function() {
		this.parsed['users'] = this.data['rounds'][round];
		this.parsed['rounds'] = round;
		for (var a in this.parsed['users']) {
			a = '<div class="col-md-6 col-xs-12">' + a + '</div>';
		}
	}
}