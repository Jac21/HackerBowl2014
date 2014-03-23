var http = require('http');
var fs = require('fs');
var bracket = require('./js/bracket.js');
var menu = require('./js/menu.js');

http.createServer(function (req, res) {
	if (req.url.indexOf('bracket', req.url) !== -1) {     // bracket
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
    } else if (req.url.indexOf('template', req.url) !== -1) {      // templates
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('.'+req.url, function(err, template) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(template);
            res.end();
        });
    } else if (req.url.indexOf('js', req.url) !== -1) {       // js
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('.'+req.url, function(err, data) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else if (req.url.indexOf('/css/', req.url) !== -1) {       // css
        res.writeHead(200, {'Content-Type': 'text/css'});
        fs.readFile('.'+req.url, function(err, data) {
            console.log('Client called: ' + req.url);
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else if (req.url.indexOf('.json', req.url) !== -1) {      // json
        res.writeHead(200, {'Content-Type': 'text/json'});
        console.log('Client called: ' + req.url);
        fs.readFile('.'+req.url, function(err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else if (req.url.indexOf('Menu.html', req.url) !== -1) {     // menu.html
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log('Client called: ' + req.url);
        menu.build(req, res);
    } else {
        console.log('Failed call: ' + req.url);
    }
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');