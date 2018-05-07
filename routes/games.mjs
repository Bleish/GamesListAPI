import express from 'express';
let router = express.Router();
import Game from '../models/game';

router.get('/', function(req, res){
    Game.find(function(err, games){
        if (err) res.send(err);
        res.json(games);
    });
    // Alternate code
    // let query = Game.find({});
    // query.exec((err, games) => {
    //     if (err) res.send(err);
    //     res.json(games);
    //     console.log(games);
    // });
});
router.post('/', function(req, res){
   res.send('POST route on games.');
});

export default router;
