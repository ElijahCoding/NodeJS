const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('');
        res.end();
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h4>Error</h4>');
        res.end();
    }
});

server.listen(3000);
