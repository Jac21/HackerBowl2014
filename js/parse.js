var Mustache = require('mustache'),
	jsdom = require('jsdom');

module.exports = {
	build: function(obj, templateHtml, templateID, html, divID, response) {
		var obj2 = {};
		if (obj[obj.length-1].length == 6) {
			obj2 = obj[obj.length-1];
			delete obj[obj.length-1];
		}
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
						if (templateHtml.indexOf('brackets') !== -1) {
							output = Mustache.render(self.htmlDocument, obj2);
							self.htmlDocument = output;
							self.send(response);
						} else {
							self.send(response);
						}
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