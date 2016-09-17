//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//REST routes
router.get('/api/captions', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;


