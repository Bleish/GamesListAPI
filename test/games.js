// This allows Mocha to require ES6 modules
require = require('esm')(module);

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let Game = require('mongoose').model('Game');
let data = require('./data/gameData');

let should = chai.should();
let server = app.server;

chai.use(chaiHttp);

describe('Games', function () {
    this.timeout(5000);

    before((done) => {
        Game.create(data.GAME1, data.GAME2, data.GAME3, (err) => {
            if (err) {
                console.error(err);
            }
            done();
        });
    });

    after((done) => {
        Game.deleteMany({
            system: data.SYSTEM
        }, (err) => {
            if (err) {
                console.error(err);
            }
            done();
        });
    });

    describe('/GET games', () => {
        it('should GET all games', (done) => {
            chai.request(server)
                .get('/games')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.include.property('system', data.SYSTEM);
                    done();
                });
        });
    });
});