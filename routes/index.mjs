import express from 'express';
let router = express.Router();

import games from './games';
// let games = require('./games').default;

router.use('/games', games);

router.get('/', function(req, res){
    res.send('GET route on index.');
});

export default router;
// module.exports = router;
