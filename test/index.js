let mongoose = require('mongoose');
let User = require('../models/user');
let Group = require('../models/group');
let bcrypt = require('bcryptjs');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let jwt = require('jsonwebtoken');
let config = require('../config/credentials');
chai.use(chaiHttp);
var auth;

describe('Tokens', function () {
  this.timeout(50000)
  beforeEach((done) => {
      User.create({_id: "admin", password: bcrypt.hashSync('admin', 8), birthDate: new Date(), firstName: 'admin', lastName: 'admin', postalCode: '1234am', email: 'admin', houseNumber: '1'}, (e, user) => {
        Group.create({_id: "Administrator", users: user._id}, (e, group) => {
          token = jwt.sign({ id: user._id }, config.key, {expiresIn: 8640000});
          auth = "Bearer " + token
          done();
        });
      });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done()
  });

  describe('POST /tokens', () => {
    let credentials = JSON.stringify({email: 'admin', password: 'admin'});

    it('it should returns the token if authorized', (done) => {
      chai.request(server)
      .post('/tokens')
      .set('content-type', 'application/vnd.api+json')
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.auth.should.eql(true);
        res.body.id.should.eql('admin');
        done();
      });
    });

    let invalidCreds = JSON.stringify({email: 'wrong', password: 'wrong'});

    it('it should return 404 when creds are wrong', (done) => {
      chai.request(server)
      .post('/tokens')
      .set('content-type', 'application/vnd.api+json')
      .send(invalidCreds)
      .end((err, res) => {
        res.should.have.status(404)
        done();
      });
    });
  });
});
