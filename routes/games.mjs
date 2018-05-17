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
            return res.status(500).send('There was a problem finding the game.');
        }
        if (!game) {
            return res.status(404).send('No game found.');
        }
        res.status(200).send(game);
    });
});

router.post('/', (req, res) => {
    Game.create({
            name: req.body.name,
            system: req.body.system,
            releaseDate: req.body.releaseDate
        },
        (err, game) => {
            if (err) {
                return res.status(500).send('There was a problem adding the game to the database.');
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
                return res.status(500).send('There was a problem updating the game.');
            }
            res.status(200).send(game);
        });
});

router.delete('/:id', (req, res) => {
    Game.findByIdAndRemove(req.params.id, (err, game) => {
        if (err) {
            return res.status(500).send('There was a problem deleting the game.');
        }
        res.status(200).send('Game ' + game.name + ' was deleted.');
    });
});

export default router;