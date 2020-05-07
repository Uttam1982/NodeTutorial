// creating a module
console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io.log';

function log(message){
    console.log(message);
}

//make this variables and function public

//module.exports.log = log;
module.exports =log;
// module.exports.endPoint= url;