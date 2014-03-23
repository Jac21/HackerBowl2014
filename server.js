var http = require('http');
var fs = require('fs');
var bracket = require('./js/bracket.js');

http.createServer(function (req, res) {
	if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./index.html', function(err, html) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(html);
            res.end();
        });
    } else if (req.url.indexOf('html') !== -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('.'+req.url, function(err, html) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(html);
            res.end();
        });
    } else if (req.url.indexOf('/', req.url.length-1) !== -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('.'+req.url+'/index.html', function(err, html) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(html);
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('.'+req.url, function(err, data) {
            console.log('Client called: ' + req.url);
            if (err) {
                console.log('error: ' + err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');

var data = {
    "id": null,
    "host": {
        "id": null,
        "name": null,
        "IGN": null
    },
    "info": {
        "summary": null,
        "status": null,
        "game": null,
        "location": null,
        "time": null,
        "type": null,
        "style": null,
        "cost": null,
        "total-pot": null,
        "current-div": null,
        "current-size": 0,
        "max-size": null,
    },
    "users": {
        "user1": {
            "id": null,
            "name": null,
            "IGN": null
        },
        "user2": {
            "id": null,
            "name": null,
            "IGN": null
        }
    },
    "bracket": {
        "total-rounds": 3,
        "rounds": {
            "round1": [
                "user1",
                "user2"
            ],
            "round2": [
                "user3",
                "user4"
            ],
            "round3": [
                "user2",
                "user4"
            ]
        }
    }
}
bracket.build(data["bracket"]);