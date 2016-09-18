var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    Class: String,
    prob: Number
});

mongoose.model('Tag', TagSchema);