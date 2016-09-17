//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sentencer = require('sentencer');
var memeMatch = require('memes');

//REST routes
router.get('/api/captions', function(req, res, next) {
    // var memes = memeMatch(req.body.tag);
    res.send(Sentencer.make("This test contains {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."));
});

module.exports = router;
