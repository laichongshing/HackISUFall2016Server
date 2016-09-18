var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    Class: String,
    prob: Number,
    meme: {type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }
});

mongoose.model('Tag', TagSchema);