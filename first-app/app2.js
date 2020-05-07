//Built in module: Http

/*
* create networking applications
* we can create web server that listen for http request on a given port
* we can create backend service for our client applications
*/

console.log('**********Built in module: Http***********');

const http = require('http');

const server = http.createServer();

server.on('connection', (socket) => {
    console.log('New connection...');
});

server.listen(3000);

console.log('listing on port 3000...');

// *******************************************************************