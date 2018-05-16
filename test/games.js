// This allows mocha to require es6 modules
require = require('esm')(module);

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let Game = require('mongoose').model('Game');

let should = chai.should();
let server = app.server;

chai.use(chaiHttp);

describe('Games', function () {
    this.timeout(5000);

    before((done) => {
        Game.create({
            name: 'TestGame1',
            system: 'TestSystem',
            releaseDate: 2001
        }, {
            name: 'TestGame2',
            system: 'TestSystem',
            releaseDate: 2002
        }, {
            name: 'TestGame3',
            system: 'TestSystem',
            releaseDate: 2003
        }, (err) => {
            if (err) {
                console.error(err);
            }
            done();
        });
    });

    after((done) => {
        Game.deleteMany({
            system: 'TestSystem'
        }, (err) => {
            if (err) {
                console.error(err);
            }
            done();
        });
        // For when the test database is set up
        // Game.deleteMany((err) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     done();
        // });
    });

    describe('/GET games', () => {
        it('should GET all games', (done) => {
            chai.request(server)
                .get('/games')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});