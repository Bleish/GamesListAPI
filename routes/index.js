var express = require('express');
var router = express.Router();

var games = require('./games');

router.use('/games', games);

router.get('/', function(req, res){
    res.send("GET route on index.");
});

module.exports = router;
