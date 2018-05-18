import express from 'express';
import Game from '../models/game';

let router = express.Router();

router.get('/', (req, res) => {
    Game.find((err, games) => {
        if (err) {
            res.send(err);
        }
        res.json(games);
    });
});

router.get('/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if (err) {
            if (err.name === 'CastError') {
                res.status(400);
            } else {
                res.status(500);
            }
            return res.send(err);
        }
        if (!game) {
            return res.status(404).send('No game found.');
        }
        res.status(200).send(game);
    });
});

router.post('/', (req, res) => {
    Game.create({
            title: req.body.title,
            system: req.body.system,
            releaseDate: req.body.releaseDate
        },
        (err, game) => {
            if (err) {
                if (err.name === 'ValidationError') {
                    res.status(400);
                } else {
                    res.status(500);
                }
                return res.send(err);
            }
            res.status(200).send(game);
        });
});

router.put('/:id', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        },
        (err, game) => {
            if (err) {
                return res.status(500).send('There was a problem updating the game.'); // TODO: Replace with RESTful status codes
            }
            res.status(200).send(game);
        });
});

router.delete('/:id', (req, res) => {
    Game.findByIdAndRemove(req.params.id, (err, game) => {
        if (err) {
            return res.status(500).send('There was a problem deleting the game.'); // TODO: Replace with RESTful status codes
        }
        res.status(200).send('Game ' + game.title + ' was deleted.');
    });
});

export default router;