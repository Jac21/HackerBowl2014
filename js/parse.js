var Mustache = require('mustache'),
	jsdom = require('jsdom');

module.exports = {
	build: function(obj, templateHtml, templateID, html, divID, response) {
		var obj2 = {}; 
		if (Object.keys(obj.pop()).length > 4) {
			obj2 = obj.pop();
			delete obj.pop();
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
				for (var i = 0; i < Object.keys(obj).length; ++i) {
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
						var a = window.document.documentElement.innerHTML;
						if (templateHtml.indexOf('brackets') !== -1) {
							var out = Mustache.render(a, obj2);
							window.document.documentElement.innerHTML = out;
							$('#'+divID).html(output);
							self.htmlDocument = window.document.documentElement.innerHTML;
							self.send(response);
						} else {
							$('#'+divID).html(output);
							self.htmlDocument = window.document.documentElement.innerHTML;
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