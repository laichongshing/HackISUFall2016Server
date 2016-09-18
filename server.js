var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Clarifai = require('clarifai');

var app = express();

require('./app/model/Meme');

// set our port
var port = process.env.PORT || 8080;

// mongoose.connect('mongodb://caption:caption@ds033056.mlab.com:33056/captiondb', function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });

mongoose.connect('mongodb://caption:caption@ds033056.mlab.com:33056/captiondb', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

// routes
var routes = require('./app/routes');
app.use('/', routes);

//start app at localhost:8080
app.listen(port);

console.log('Listening on  port ' + port);

exports = module.exports = app;
