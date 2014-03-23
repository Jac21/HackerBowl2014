var fs = require('fs');

module.exports = {
	now: function(user, res) {
		fs.readFile("./tournaments/"+user.id+".json", function(err, data) {
			if (err) throw err;
			try {
			data = JSON.parse(data);
			} catch (e) {
				console.log("JSON.parse failed, resorting to eval.");
				data = eval( "(" + data + ")" );
			}
			var newUser = {
	            "id": data.users.length,
	            "name": user.name,
	            "IGN": user.IGN
			}
			data.users.push(newUser);
			data.bracket.rounds.push(newUser);
			data.info.rounds = data.bracket.rounds.length;
			data.info.currentSize = data.users.length;
			fs.writeFile("./tournaments/"+user.id+".json", JSON.stringify(data), function(err) {
				if (err) throw err;
				console.log("wrote new user: " + user.name + " to " + user.id+ ".json");
				res.writeHead(200, {'Content-Type': 'text/html'});
            	fs.readFile('./index.html', function(err, html) {
                	if (err) throw err;
                	res.write(html);
                	res.end();
            	});
			});
		});
	}
}