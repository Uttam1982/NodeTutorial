// function sayHello(name){
//     console.log("Hello "+name);
// }

// sayHello('Uttam')
// *******************************************************************

//global object
// console.log();
// setTimeout();

// clearTimeout();
// setInterval();

// clearInterval();

// var message= 'hello';  //variable are not added to globalby default
// // global.setTimeout()
// global.console.log(global.message); //undefined

// *******************************************************************
// Module
//console.log(module);

// *******************************************************************
// how to create a module - create a looger module

// *******************************************************************
//load a module
// var logger = require("./logger.js");
//const logger = require("./logger.js");
// require("./subfolder/looger.js"); //subfolder
//require(../looger.js); //parent folder

//console.log(logger);
// logger =1;
//logger.log('This is a message');

//logger("my message");

// *******************************************************************
//Built in module Path
const path = require('path');

var pathObj = path.parse(__filename);
console.log(pathObj);
console.log(pathObj.root);
console.log(pathObj.dir);
console.log(pathObj.base);
console.log(pathObj.ext);
console.log(pathObj.name);

// *******************************************************************
//Built in module: OS

const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);

//Template String
// ES6 / ES2015: ECMAScript 6

console.log(`Total Memory using template string: ${totalMemory}`);
console.log(`Free Memory using template string: ${freeMemory}`);

// *******************************************************************
//Built in module: FileSystem
const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log("list of files: "+files);

fs.readdir('./', function (err, files) { //current directory
    if (err) {
        console.log('Error: ' + err);
    } else {
        console.log('List of files: ' + files);
    }
});

// *******************************************************************
//Built in module: Events 
const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listener
emitter.on('messageLogged', function () {
    console.log('Listner called');
})

//Raise an event
emitter.emit('messageLogged');  //Making a noise , produce - signalling

// *******************************************************************
//Built in module: Events with arguments
//const EventEmitter = require('events');
const emitter1 = new EventEmitter();

//Register a listener
emitter1.on('messageLogged', function (args) {
    console.log('Listner called with arguments: ', args);
})

//Raise an event
emitter1.emit('messageLogged', { 'id': 1, 'url': 'https://' });  //Making a noise , produce - signalling

// *******************************************************************
//Built in module: Events with arguments using errow method
//const EventEmitter = require('events');
const emitter2 = new EventEmitter();

//Register a listener
emitter2.on('messageLogged', (args) => {
    console.log('Listner called with arguments using errow method: ', args);
})

//Raise an event
emitter2.emit('messageLogged', { 'id': 1, 'url': 'https://' });  //Making a noise , produce - signalling

// *******************************************************************
// extending Emitter
//const EventEmitter = require('events');


const Logger = require('./logger2.js');
const logger = new Logger();

//Register an event
logger.on('messageLogged', function (args) {
    console.log('Listner called extending Event Emitter: ', args);
});

logger.log('message: hello world');


// *******************************************************************

// //Built in module: Http

// /*
// * create networking applications
// * we can create web server that listen for http request on a given port
// * we can create backend service for our client applications
// */

// console.log('**********Built in module: Http***********');

const http = require('http');

const server = http.createServer((req,res)=>{
if(req.url==='/'){
    res.write('Hello World');
    res.end();
}

if(req.url==='/api/courses'){
    res.write(JSON.stringify([1,2,3,4]));
    res.end();
}

});


// server.on('connection', (socket) => {
//     console.log('New connection...');
// });

server.listen(3000);

console.log('listing on port 3000...');

// // *******************************************************************