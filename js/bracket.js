var Mustache = require('mustache'),
	fs = require('fs'),
	jsdom = require('jsdom');

module.exports = {
	build: function(json) {
		this.data = json;
		var totalRounds = this.data['total-rounds'];
		var self = this;
		fs.readFile('./Template/template-brackets.html', function(err, templateHTML) {
			fs.readFile('./index.html', function(err, HTML) {
				var template = '';
				var self = this;
				jsdom.env({  
					html: templateHTML,
					scripts: [
				    	'http://code.jquery.com/jquery-2.1.min.js'
					]
				}, function (err, window) {
				  var $ = window.jQuery;
				  self.template = $('#template-round').html();
				});
				for (var i = 0; i < totalRounds; ++i) {
					self.parseData(i);
					var output = Mustache.render(template, parsed);
					jsdom.env({  
						html: HTML,
						scripts: [
					    	'http://code.jquery.com/jquery-2.1.min.js'
						]
					}, function (err, window) {
					  var $ = window.jQuery;
					  $('#bracket').html(output);
					});
				}
			});
		});
	},
	parseData: function(round) {
		this.parsed['users'] = this.data['rounds'][round];
		this.parsed['rounds'] = round;
		for (var a in this.parsed['users']) {
			a = '<div class="col-md-6 col-xs-12">' + a + '</div>';
		}
	},
	data: undefined,
	parsed: { 'round': null, 'users': {} }
}