var Mustache = require('mustache'),
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
				var output = '';
				for (var i = 0; i < obj.length; ++i) {
					output += Mustache.render(self.template, obj[i]);
				}
				window.close();
				jsdom.env({  
					url: 'http://localhost' + html,
					scripts: [
				    	'http://code.jquery.com/jquery-2.1.0.min.js'
					],
					done: function (err, window) {
						var $ = window.jQuery;
						$('#'+divID).html(output);
						self.htmlDocument = window.document.documentElement.innerHTML;
						self.send(response);
            			window.close();
					}
				});
			}
		});
	},
	send: function(res) {
		var footerScript = '<script id="f">document.getElementsByClassName("jsdom")[0].remove();document.getElementById("f").remove();</script>';
		this.htmlDocument = '<!DOCTYPE html><html lang="en">' + this.htmlDocument + footerScript + '</html>';
		res.write(this.htmlDocument);
        res.end();
	},
	template: '',
	htmlDocument: ''
}