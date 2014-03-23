var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    bracket = require('./js/bracket.js'),
    menu = require('./js/menu.js'),
    update = require('./js/update.js');

http.createServer(function (req, res) {
    if (req.method === 'GET') {
    	if (req.url.indexOf('.bracket') !== -1) {     // bracket
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log('Client called: ' + req.url);
            bracket.build(req, res);
        } else if (req.url === '/index.html' || req.url === '/') {     // index.html
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('./index.html', function(err, html) {
                console.log('Client called: ' + req.url);
                if (err) throw err;
                res.write(html);
                res.end();
            });
        } else if (req.url.indexOf('template') !== -1) {      // templates
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('.'+req.url, function(err, template) {
                console.log('Client called: ' + req.url);
                if (err) throw err;
                res.write(template);
                res.end();
            });
        } else if (req.url.indexOf('js') !== -1) {       // js
            res.writeHead(200, {'Content-Type': 'text/plain'});
            fs.readFile('.'+req.url, function(err, data) {
                console.log('Client called: ' + req.url);
                if (err) throw err;
                res.write(data);
                res.end();
            });
        } else if (req.url.indexOf('/css/') !== -1) {       // css
            res.writeHead(200, {'Content-Type': 'text/css'});
            fs.readFile('.'+req.url, function(err, data) {
                console.log('Client called: ' + req.url);
                if (err) throw err;
                res.write(data);
                res.end();
            });
        } else if (req.url.indexOf('.json') !== -1) {      // json
            res.writeHead(200, {'Content-Type': 'text/json'});
            console.log('Client called: ' + req.url);
            fs.readFile('.'+req.url, function(err, data) {
                if (err) throw err;
                res.write(data);
                res.end();
            });
        } else if (req.url.indexOf('Menu') !== -1) {     // menu.html
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log('Client called: ' + req.url);
            menu.build(req, res);
        } else {
            console.log('Failed call: ' + req.url);     // fail safe
        }
    } else if (req.method === 'POST') {         // POST for JSON
        var queryData = "";
        req.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                res.writeHead(413, {'Content-Type': 'text/plain'});
                res.end();
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            if (queryData === undefined) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end();
            } else {
                var POST = qs.parse(queryData);
                var filename = Math.floor(Math.random()*10000) + '.json';
                POST = parseJS(POST, filename);
                if (POST !== undefined) {
                    fs.stat(filename, function(err, stat) {
                        if (err) {
                            fs.writeFile("./tournaments/"+filename, JSON.stringify(POST), function(err) {
                                if (err) throw err;
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                console.log('Client called: ' + req.url);
                                res.end();
                                //menu.build(req, res);
                            });
                        } else {
                            filename = Math.floor(Math.random()*10000) + '.json';
                            fs.writeFile("./tournaments/"+filename, JSON.stringify(POST), function(err) {
                                if (err) throw err;
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                console.log('Client called: ' + req.url);
                                //menu.build(req, res);
                                res.end();
                            });
                        }
                    });
                }            
            }
        });
    }
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');

function parseJS(data, id) {
    if (data.length < 3) {
        update.now(id+'.json', data);
    } else {
        var a = {
            "id": id,
            "host": {
                "id": 0,
                "name": data.name,
                "IGN": data.IGN
            },
            "info": {
                "title": data.title,
                "summary": data.summary,
                "status": data.status,
                "game": data.game,
                "location": data.location,
                "time": data.time,
                "type": data.type,
                "style": data.style,
                "cost": data.cost,
                "total-pot": null,
                "currentSplit": null,
                "currentSize": 1,
                "maxSize": data.maxSize,
                "rounds": null,
            },
            "users": [
                {
                "id": 0,
                "name": data.name,
                "IGN": data.IGN
                }
            ],
            "bracket": {
                "rounds": []
            }
        }
        a.bracket.rounds.push(a.users[0]);
        return a;
    }
}