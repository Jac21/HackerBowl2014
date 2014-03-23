var Mustache = require('mustache'),
	fs = require('fs'),
	jsdom = require('jsdom');

module.exports = {
	build: function(obj, templateHtml, templateID, html, divID, response) {
		var self = this;
		jsdom.env({  
			url: 'http://localhost' + templateHtml,
			scripts: [
		    	'http://code.jquery.com/jquery-2.1.0.min.js'
			],
		 	done: function (err, window) {
		 		var $ = window.jQuery;
				self.template = $('#'+templateID).html();
				var output = Mustache.render(self.template, obj);
				window.close();
				jsdom.env({  
					url: 'http://localhost' + html,
					scripts: [
				    	'http://code.jquery.com/jquery-2.1.0.min.js'
					],
					done: function (err, window) {
						var $ = window.jQuery;
						$('#'+divID).html(output);
						self.htmlDocument = '<!DOCTYPE html><html lang="en">' + window.document.documentElement.innerHTML + '</html>';
						response.write(self.htmlDocument);
            			response.end();
            			window.close();
					}
				});
			}
		});
	},
	template: '',
	htmlDocument: ''
}