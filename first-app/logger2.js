const EventEmitter = require('events');


class Logger extends EventEmitter{
    url = 'http://mylogger.io.log';

    log(message){
        //send the http request
        console.log(message);

        //Raise an event
        this.emit('messageLogged',{'id':1, 'url':'https://'});
    }

}


//make this variables and function public

module.exports = Logger;
