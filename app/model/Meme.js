var mongoose = require('mongoose');

var MemeSchema = new mongoose.Schema({
    topText: String,
    bottomText: String,
    tags: [{Class: String, prob: Number }]
});

mongoose.model('Meme', MemeSchema );