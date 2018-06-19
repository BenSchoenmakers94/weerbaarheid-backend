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

describe('Groups', function () {
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

  describe('/GET groups', () => {
    it('it should GET all the groups', (done) => {
      chai.request(server)
      .get('/groups')
      .set('authorization', auth)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.data.should.be.a('Array');
        res.body.data.length.should.eql(1);
        done();
      });
    });
  });

  describe('GET /groups/:id', () => {
    it('it should GET a single group', (done) => {
      chai.request(server)
      .get('/groups/Administrator')
      .set('authorization', auth)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.id.should.eql('Administrator');
        done();
      });
    });

    it('it should return 404 when not found', (done) => {
      chai.request(server)
      .get('/groups/nonExistent')
      .set('authorization', auth)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('CREATE /groups', () => {
    let params = JSON.stringify({data: {attributes: { id: 'test_group' }}})
    it('it should CREATE a group', (done) => {
      chai.request(server)
      .post('/groups')
      .set('authorization', auth)
      .set('content-type', "application/vnd.api+json")
      .send(params)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.data.id.should.eql('test_group')
        done();
      });
    });

    describe('/PATCH groups/:id', () => {
      let params = JSON.stringify({data: {attributes: {id: 'test'}}})

      it('it should PATCH the group', (done) => {
        chai.request(server)
        .patch('/groups/Administrator')
        .set("authorization", auth)
        .set("content-type", "application/vnd.api+json")
        .send(params)
        .end((err, res) => {
          console.log(err)
          res.should.have.status(200)
          done();
        });
      });
    });

    let invalidParams = JSON.stringify({data: {attributes: { id: null }}})

    it('it should return errors', (done) => {
      chai.request(server)
      .post('/groups')
      .set('authorization', auth)
      .set('content-type', "application/vnd.api+json")
      .send(invalidParams)
      .end((err, res) => {
        res.should.have.status(422)
        res.text.should.contain('Group validation failed');
        done();
      });
    });
  });
});
