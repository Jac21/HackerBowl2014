var http = require('http');
var fs = require('fs');
var random = require('./main.js');

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
random.hello();