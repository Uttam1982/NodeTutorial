const express = require('express');
const router = express.Router();
const Joi = require('joi'); //joi will return a class

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with a given Id was not found');
  res.send(course);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    //400 BAD request
    //res.status(400).send(error);
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  //look up the course
  //if, not existing , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with a given Id was not found');

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

router.delete('/:id', (req, res) => {
  //look up the course
  //if, not existing , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with a given Id was not found');

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

module.exports = router;
