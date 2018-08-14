const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect to our DB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // tell mongoose ot use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all our models
require('./models/User');
require('./models/Exercise');


// import all our other tools
var express = require('express');
var app = express();
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// use body-parser to be able to parse POST reqeusts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// organize all our routes via routes/index.js
app.use('/', routes);

// error handler via JSON
app.use(errorHandlers.errorResponse);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
