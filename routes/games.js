var express = require('express');
var router = express.Router();
var Game = require('../models/game');

router.get('/', function(req, res){
    Game.find(function(err, games){
        if (err) res.send(err);
        res.json(games);
    });
    // Alternate code
    // var query = Game.find({});
    // query.exec((err, games) => {
    //     if (err) res.send(err);
    //     res.json(games);
    //     console.log(games);
    // });
});
router.post('/', function(req, res){
   res.send('POST route on games.');
});

module.exports = router;
