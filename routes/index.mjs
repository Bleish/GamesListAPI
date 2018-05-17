import express from 'express';
import games from './games';

let router = express.Router();

router.use('/games', games);

router.get('/', (req, res) => {
    res.send('GET route on index.');
});

export default router;