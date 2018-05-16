import express from 'express';
let router = express.Router();
import Game from '../models/game';

router.get('/', (req, res) => {
    Game.find((err, games) => {
        if (err) {
            res.send(err);
        }
        res.json(games);
    });

    // Alternate query code
    // let query = Game.find({});
    // query.exec((err, games) => {
    //     if (err) res.send(err);
    //     res.json(games);
    //     console.log(games);
    // });
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