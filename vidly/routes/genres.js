const express = require('express');
const router = express.Router();

const Joi = require('joi');

//create a list of genres
const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

//Get all genres
router.get('/', (req, res) => {
  res.send(genres);
});

//GET genre by id
router.get('/:id', (req, res) => {
  //check if the course exist
  //if not existing return 404,
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with the id ${req.params.id} was not found !`);

  res.send(genre);
});

//POST add  a genre
router.post('/', (req, res) => {
  //validate
  //if invalid return 400, Bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  //Add the new genre
  genres.push(genre);

  //display to the end user
  res.send(genre);
});

//PUT Update the existing course
router.put('/:id', (req, res) => {
  //check if the genre exists
  //if not existing, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with the id ${req.params.id} was not found !`);

  //validate the request
  //if invalid return 400, Bad request

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update
  genre.name = req.body.name;

  res.send(genre);
});

router.delete('/:id', (req, res) => {
  //check if the genre exists
  //if not existing, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with the id ${req.params.id} was not found !`);

  //delete the record
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  //return the same course
  res.send(genre);
});

//Validating genre
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
