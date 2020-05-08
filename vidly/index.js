const Joi = require('joi');
const express = require('express');
const app = express();

const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

//GET INDEX PAGE
app.get('/', (req, res) => {
  res.send('Welcome to Vidly');
});

//create an enviornment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning to port ${port}...`));
