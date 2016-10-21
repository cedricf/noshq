var express = require('express');
var morgan      = require('morgan');

var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/noshq');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// use morgan to log requests to the console
app.use(morgan('dev'));

var location = require('./routes/location.js')(app);
var eatery = require('./routes/eatery.js')(app);

var server = app.listen(3000, function () {
   console.log('Server running at http://127.0.0.1:3000/');
});
