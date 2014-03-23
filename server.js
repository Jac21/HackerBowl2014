var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    bracket = require('./js/bracket.js'),
    menu = require('./js/menu.js');

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
            console.log('Failed call: ' + req.url);
        }
    } else if (req.method === 'POST') {
        var queryData = "";
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });
        request.on('end', function() {
            var POST = qs.parse(body);
            console.log(POST);
            parseJS(POST);
        });
    }
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');

function parseJS(data) {
    var filename = data.id + json;
    fs.writeFile("./tournaments/"+filename, JSON.stringify(data), function(err) { 
        if (err) throw err;
    });
}