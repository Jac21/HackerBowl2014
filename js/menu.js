var fs = require('fs'),
	parse = require('./js/parse.js');

module.exports = {
	build: function(response) {
		// open correct json
		// parse json
		// send parse.build(obj, templateHtml, templateID, html, divID, response)

		parseData: function() {
			this.parsed['users'] = this.data['rounds'][round];
			this.parsed['rounds'] = round;
			for (var a in this.parsed['users']) {
				a = '<div class="col-md-6 col-xs-12">' + a + '</div>';
			}
		}
	}
}