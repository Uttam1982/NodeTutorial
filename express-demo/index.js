const debug = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const app = express();

//custom middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticating');

const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views'); //default

//configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
//console.log(`Mail Password: ${config.get('mail.password')}`);

//Enviornments
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//adding a piece of middleware
//built in middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Third-party middleware
const helmet = require('helmet');
const morgan = require('morgan');

//third-party middleware function
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  //console.log('Morgan enabled...');
  debug('Morgan enabled...');
}

//Db work...
//dbDebugger('Connected to the database');

//custom middleware function logging
app.use(logger);
app.use(authenticate);

//for any routes that uses api/courses use course router
app.use('/api/courses', courses);
app.use('/', home);

//Creating a enviornment variable : PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}...`));
