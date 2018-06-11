process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');
let Group = require('../models/group');

const debug = require('debug')('test')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let jwt = require('jsonwebtoken');
let config = require('../config/credentials');

var auth;
var user;

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
      Group.findById("Administrator").populate('users').exec((err, group) => {
        user = group.users[0];
        token = jwt.sign({ id: user._id }, config.key, {expiresIn: 8640000});
        auth = "Bearer " + token
        done();
      }
    );


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

  describe('/GET users/:id', () => {

    it('it should GET the user with name', (done) => {
      chai.request(server)
      .get('/users/' + user._id)
      .set("authorization", auth)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.data.id.should.eql(user._id);
        done();
      });
    });
  });
});
