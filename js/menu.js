var fs = require('fs'),
	parse = require('./parse.js');
	walkPath = './tournaments';
module.exports = {
	build: function(request, response) 
	{
		var self = this;
		var walk = function (dir, done) 
		{
			console.log("HI:D");
			console.log(dir);
		    list = fs.readdirSync(dir) 
		    {
			console.log("("+list+")");
		        var i = 0;
		 	console.log("its in");
		        (function next () 
		        {
		            var file = list[i++];
		            if (!file) 
		            {
		                return done(null);
		            }
		            
		            file = dir + '/' + file;
		                    // do stuff to file here
					
			data = fs.readFileSync(file, 'utf8');
				try {
		            self.obj = JSON.parse(data);
				
				} catch (e) {
					
					self.obj = eval("("+data+")"); 
					
					return done(null);
				}
			       
				self.parsed.push(self.parseData());
                    		next();
		       
		        })();
		    }
		};
		 
		 
		console.log('-------------------------------------------------------------');
		console.log('processing...');
		console.log('-------------------------------------------------------------');
		 
		walk(walkPath, function(error) 
		{
		    if (error) 
		    {
		        throw error;
		    } 
		    else 
		    {
		        console.log('-------------------------------------------------------------');
		        console.log('finished.');
		        console.log('-------------------------------------------------------------');
self.parsed.push({});
console.log(self.parsed)
parse.build(self.parsed, '/Template/template-tabled.html', 'templatetd', '/html/template-menu-index.html', 'games', response);
		    }
		});
		// parse json
		
		
		//console.log(self.parsed)
		

	},
	parseData: function() 
	{
		console.log(this.obj.id)
		return {
		"title": this.obj['info']['title'],
		"status": this.obj['info']['status'],
		"game": this.obj['info']['game'],
		"type": this.obj['info']['type'],
		"currentSize": this.obj['info']['currentSize'],
		"time": this.obj['info']['time'],
		"id": this.obj.id
		}
	},
	obj: {},
	parsed: []
}
