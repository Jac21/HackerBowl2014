var fs = require('fs'),
	parse = require('./parse.js');
	walkPath = './tournaments';
module.exports = {
	build: function(response) 
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
		            console.log("("+file+")");
			    debugger;
		                    // do stuff to file here
					console.log("its going to check the file");
					data = fs.readFileSync(file, 'utf8');
						try {
				             		self.obj = JSON.parse(data);
							 console.log(self.obj);
						} catch (e) {
							 console.log(self.obj);
							 console.log("Y is the dot bad");
							self.obj = eval("("+data+")"); 
	 						console.log("well its nt here");
							return done(null);
						}
					        console.log("+data+");
 						self.parsed.push(self.parseData());
		                    		console.log(self.parsed);
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
			console.log("Error y");
		        throw error;
		    } 
		    else 
		    {
		        console.log('-------------------------------------------------------------');
		        console.log('finished.');
		        console.log('-------------------------------------------------------------');
		    }
		});
		// parse json
		console.log(self.parsed);
		parse.build(this.parsed, '/Template/template-tabled.html', 'template-td', '/html/template-menu-index.html', 'games', response);

	},
	parseData: function() 
	{
		return {
		"title": this.obj['info']['title'],
		"status": this.obj['info']['status'],
		 "game": this.obj['info']['game'],
		"type": this.obj['info']['type'],
		"currentSize": this.obj['info']['currentSize'],
		"time": this.obj['info']['time']
		}
	},
	obj: {},
	parsed: []
}
