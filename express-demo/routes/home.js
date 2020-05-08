const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //callback function called route handler
  //res.send('Hello World !!!');
  res.render('index', {
    title: 'My Express Page',
    message: 'Welcome to the website !!'
  });
});

module.exports = router;
