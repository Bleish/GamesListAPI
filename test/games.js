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
        Game.create(data.testGameSingle, data.deleteGameSingle, (err) => {
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
        done();
    });

    describe('/GET games', () => {
        it('should return 200 (OK)', (done) => {
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
    
    describe('/GET game', () => {
        it('should return 200 (OK)', (done) => {
            chai.request(server)
                .get(`/games/${data.testGameSingle._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.property('_id', data.testGameSingle._id.toString());
                    done();
                });
        });
        it('should return 400 (Bad Request) when id is invalid', (done) => {
            chai.request(server)
                .get(`/games/badId`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should return 404 (Not Found) when game does not exist', (done) => {
            chai.request(server)
                .get(`/games/${data.badId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/POST game', () => {
        it('should return 200 (OK)', (done) => {
            chai.request(server)
                .post('/games')
                .send(data.postGameSingle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.property('title', data.postGameSingle.title);
                    done();
                });
        });
        it('should return 400 (Bad Request) when missing mandatory fields', (done) => {
            chai.request(server)
                .post('/games')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should return 400 (Bad Request) when format is invalid', (done) => {
            chai.request(server)
                .post('/games')
                .send(data.testGameSingleInvalid)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/PUT game', () => {
        it('should return 200 (OK)', (done) => {
            chai.request(server)
                .put(`/games/${data.testGameSingle._id}`)
                .send(data.putGameSingle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include.property('title', data.putGameSingle.title);
                    done();
                });
        });
        it('should return 400 (Bad Request) when id is invalid', (done) => {
            chai.request(server)
                .put(`/games/badId`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should return 400 (Bad Request) when format is invalid', (done) => {
            chai.request(server)
                .put(`/games/${data.testGameSingle._id}`)
                .send(data.testGameSingleInvalid)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should return 404 (Not Found) when game does not exist', (done) => {
            chai.request(server)
                .put(`/games/${data.badId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/DELETE game', () => {
        it('should return 200 (OK)', (done) => {
            chai.request(server)
                .delete(`/games/${data.deleteGameSingle._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal(`Game, ${data.deleteGameSingle.title}, was deleted.`);
                    done();
                });
        });
        it('should return 400 (Bad Request) when id is invalid', (done) => {
            chai.request(server)
                .delete(`/games/badId`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should return 404 (Not Found) when game does not exist', (done) => {
            chai.request(server)
                .delete(`/games/${data.badId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});