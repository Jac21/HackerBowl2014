var fs = require('fs');

module.exports = {
	now: function(filename, user) {
		fs.readFile("./tournaments/"+filename, function(err, data) {
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
			fs.writeFile("./tournaments/"+filename, JSON.stringify(POST), function(err) {
				if (err) throw err;
				console.log("wrote new user: " + user.name + " to " + filename);
			});
		});
	}
}