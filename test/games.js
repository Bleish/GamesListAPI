require = require("@std/esm")(module,{"esm":"js"});

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app.js');

// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app.mjs';

let should = chai.should();

chai.use(chaiHttp);

describe('Games', function() {
    this.timeout(5000);

    before(function() {

    });

    after(function() {

    });
    
    it('should GET all the games', function(done) {
        chai.request(app)
            .get('/games')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
        });
    });
});
