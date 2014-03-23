var fs = require('fs'),
	parse = require('./parse.js');
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
		                     obj = JSON.parse(file);
		                     parsed.push(parseData());
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
	parseData: function() 
	{
		return {
		"title": this.obj['title'];
		"status": this.obj['status'];
		 "game": this.obj['game'];
		"type": this.obj['users'];
		}
	},
	obj: {},
	parsed: []
}