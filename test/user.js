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

describe('Users', function () {
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

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
      .get('/users')
      .set("authorization", auth)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.data.should.be.a('Array');
        res.body.data.length.should.eql(1);
        done();
      });
    });
  });

  describe('/GET groups/:id/users', () => {
    it('it should GET all the users from the group', (done) => {
      chai.request(server)
      .get('/groups/Administrator/users')
      .set("authorization", auth)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.data.should.be.a('Array');
        res.body.data.length.should.eql(1);
        done();
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('it should DELETE the message', (done) => {
        chai.request(server)
        .del('/users/admin')
        .set('authorization', auth)
        .end((err, res) => {
          res.should.have.status(200)
          done();
        });
    });
  });

  describe('/CREATE users/:id', () => {
    let params = JSON.stringify({data: {attributes: {id: 'test', first_name: "test", last_name: "test", password: 'test', email: 'tester', postalCode: '1111aa', houseNumber: '1', birthDate: new Date()}}})

    it('it should CREATE the user', (done) => {
        chai.request(server)
        .post('/users')
        .set("authorization", auth)
        .set("content-type", "application/vnd.api+json")
        .send(params)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.data.id.should.eql('test');
          done();
        });
    }); 
  });

  describe('/CREATE groups/:id/users/:id', () => {
    let params = JSON.stringify({data: {attributes: {id: 'test', first_name: "test", last_name: "test", password: 'test', email: 'tester', postalCode: '1111aa', houseNumber: '1', birthDate: new Date()}}})

    it('it should CREATE the user', (done) => {
        chai.request(server)
        .post('/groups/Administrator/users')
        .set("authorization", auth)
        .set("content-type", "application/vnd.api+json")
        .send(params)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.data.id.should.eql('test');
          done();
        });
    }); 
  });
});
