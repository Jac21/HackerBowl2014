var fs = require('fs'),
	parse = require('./parse.js');
	walkPath = './Tournaments';
module.exports = {
	build: function(response) 
	{
		var self = this;
		var walk = function (dir, done) 
		{
		    fs.readdir(dir, function (error, list) 
		    {
		        if (error) 
		        {
		            return done(error);
		        }
		 
		        var i = 0;
		 
		        (function next () 
		        {
		            var file = list[i++];
		 
		            if (!file) 
		            {
		                return done(null);
		            }
		            
		            file = dir + '/' + file;
		            
		            fs.stat(file, function (error, stat) 
		            {
		        
		                if (stat && stat.isDirectory()) 
		                {
		                    walk(file, function (error) 
		                    {
		                        next();
		                    });
		                } else {
		                    // do stuff to file here
					try {
		                     		self.obj = JSON.parse(file);
					} catch (e) {
						self.obj = eval("("+file+")"); 
					}
		                     self.parsed.push(parseData());
		                    console.log(file);
		                    next();
		                }
		            });
		        })();
		    });
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
		    }
		});
		// parse json
		parse.build(this.parsed, '/Template/template-tabled.html', 'template-td', '/html/template-menu-index.html', 'games', response);

	},
	parseData: function() 
	{
		return {
		"title": this.obj['title'],
		"status": this.obj['status'],
		 "game": this.obj['game'],
		"type": this.obj['type'],
		"current-size": this.obj['current-size'],
		"time": this.obj['time']
		}
	},
	obj: {},
	parsed: []
}
