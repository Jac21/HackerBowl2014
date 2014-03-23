var fs = require('fs'),
	parse = require('./parse.js');
	myfiles = [];
	walkPath = './../Tournaments/';
module.exports = {
	build: function(response) 
	{
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
		// send parse.build(obj, templateHtml, templateID, html, divID, response)

	},
	parseData: function() {
		var title =this.obj['users'];
		var status =this.parsed['users'];
		var game =this.parsed['users'];
		var type =this.parsed['users'];
		
	},
	obj: [],
	parsed: {}
}