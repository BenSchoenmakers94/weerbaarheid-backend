process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');
let Group = require('../models/group');
let Message = require('../models/message');
let bcrypt = require('bcryptjs');

const debug = require('debug')('test')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let jwt = require('jsonwebtoken');
let config = require('../config/credentials');
let addMessageToUser = require('../helpers/addMessageToUser');

var auth;
var admin;
var subject;

chai.use(chaiHttp);

describe('Messages', function () {
  this.timeout(50000)
  beforeEach((done) => {
      User.create({_id: "admin", password: bcrypt.hashSync('admin', 8), birthDate: new Date(), firstName: 'admin', lastName: 'admin', postalCode: '1234am', email: 'admin', houseNumber: '1'}, (e, user) => {
        Group.create({_id: "Administrator", users: user._id}, (e, group) => {
          admin = user;
          token = jwt.sign({ id: user._id }, config.key, {expiresIn: 8640000});
          auth = "Bearer " + token
          done();
        });
      });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('GET /users/:id/messages/:id', () => {
    it('it should Get all the users messages', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        addMessageToUser('test', 'admin').then(() => {
          chai.request(server)
          .get('/users/admin/messages/test')
          .set("authorization", auth)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.data.id.should.eql('test');
            done();
          });
        }).catch((err) => { console.log(err)});
      });
    });
  });

  describe('GET /messages', () => {
    it('it should GET all the messages', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        chai.request(server)
        .get('/messages')
        .set("authorization", auth)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('Object')
          res.body.data.should.be.a('Array');
          res.body.data.length.should.eql(1);
          res.body.data[0].id.should.eql('test');
          done();
        });
      });
    });
  });

  describe('GET /messages/:id', () => {
    it('it should GET a message', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        chai.request(server)
        .get('/messages/test')
        .set('authorization', auth)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.data.id.should.eql('test')
          done();
        });
      });
    });

    it('it should return 404 when not found', (done) => {
      chai.request(server)
      .get('/messages/nonExistent')
      .set('authorization', auth)
      .end((err, res) => {
        res.should.have.status(404)
        done();
      });
    });
  });

  describe('GET /users/:id/messages', () => {
    it('it should GET all the messages', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        chai.request(server)
        .get('/users/admin/messages')
        .set("authorization", auth)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('Object')
          res.body.data.should.be.a('Array');
          res.body.data.length.should.eql(0);
          done();
        });
      });
    });
  });


  describe('GET /groups/:id/users/:id/messages', () => {
    it('it should GET all the messages', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        chai.request(server)
        .get('/groups/Administrator/users/admin/messages')
        .set("authorization", auth)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('Object')
          res.body.data.should.be.a('Array');
          res.body.data.length.should.eql(0);
          done();
        });
      });
    });
  });

  describe('GET /groups/:id/users/:id/messages/:id', () => {
    it('it GETS a single message from the given user', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        addMessageToUser(null, 'test', 'admin').then((res) => {
          chai.request(server)
          .get('/groups/Administrator/users/admin/messages/test')
          .set("authorization", auth)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.data.id.should.eql('test');
            done();
          });
        });
      });

      it('it returns 404 if the user does not have the message', (done) => {
        Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
          chai.request(server)
          .get('/groups/Administrator/users/admin/messages/test')
          .set("authorization", auth)
          .end((err, res) => {
            res.should.have.status(404)
            done();
          });
        });
      });
    });
  });

  describe('PATCH /messages/:id', () => {
    let params = JSON.stringify({data: {attributes: {subject: 'test_change'}}});

    it('it should PATCH the message', (done) => {
      Message.create({_id: 'test', subject: 'test', content: 'test', urgent: false}, (e, message) => {
        chai.request(server)
        .patch('/messages/test')
        .set('authorization', auth)
        .set('content-type', 'application/vnd.api+json')
        .send(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.attributes.subject.should.eql('test_change');
          done();
        });
      });
    });
  });


  describe('CREATE /messages', () => {
    let params = JSON.stringify({data: {id: 'message1', attributes: {subject: 'test message', content: 'test_content', urgent: false}}});

    it('it should CREATE a message', (done) => {
      chai.request(server)
      .post('/users/admin/messages')
      .set('authorization', auth)
      .set('content-type', 'application/vnd.api+json')
      .send(params)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.id.should.eql('message1');
        done();
      });
    });
  });

});

