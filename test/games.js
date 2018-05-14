// This allows mocha to require es6 modules
require = require('esm')(module);

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app.mjs');

let should = chai.should();
let server = app.server;

chai.use(chaiHttp);

describe('Games', function () {
    this.timeout(5000);

    before((done) => {
        done();
    });

    after((done) => {
        done();
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