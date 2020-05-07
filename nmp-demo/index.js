var _ = require('underscore');
//1. core module
//2. File or folder
//var _ = require('./underscore'); //underscore.js
//3. node_modules - lloks for the module inside this folder

var result = _.contains([1, 2, 3], 3);
console.log(result);
