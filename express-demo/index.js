//joi will return a class
const Joi = require('joi');
const config = require('config');
const express = require('express');
const app = express();

//Third-party middleware
const helmet = require('helmet');
const morgan = require('morgan');

//configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);


//custom middleware
const logger = require('./logger');
const authenticate = require('./authenticating');

//Enviornments
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);


//adding a piece of middleware
//built in middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//third-party middleware function
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
};



//custom middleware function logging
app.use(logger);
app.use(authenticate);


const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  //callback function called route handler
  res.send('Hello World !!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with a given Id was not found');
  res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
  //res.send(req.params);
  res.send(req.query);
});

app.post('/api/courses', (req, res) => {

  const { error } = validateCourse(req.body);
  if (error) {
    //400 BAD request
    //res.status(400).send(error);
    return res.status(400).send(error.details[0].message);

  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

  //look up the course
  //if, not existing , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with a given Id was not found');

  //validate
  //if invalid, return 400 Bad Request

  //const result = validateCourse(req.body);
  // if (result.error) {
  //   //400 BAD request
  //   //res.status(400).send(result.error);
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  //Object destruction
  const { error } = validateCourse(req.body);
  if (error) {
    //400 BAD request
    //res.status(400).send(error);
    return res.status(400).send(error.details[0].message);

  }
  //Update course
  course.name = req.body.name;
  //Return the updated course
  res.send(course);

});


app.delete('/api/courses/:id', (req, res) => {
  //look up the course
  //if, not existing , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with a given Id was not found');

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //Return the same course
  res.send(course);

});

function validateCourse(course) {
  //validate
  //if invalid, return 400 Bad Request
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}



//Creating a enviornment variable
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}...`));
