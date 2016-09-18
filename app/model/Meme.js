var mongoose = require('mongoose');

var MemeSchema = new mongoose.Schema({
    topText: String,
    bottomText: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

mongoose.model('Meme', MemeSchema );