const routes = require('express').Router();
var bodyParser= require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('../config/credentials');
var User = require('..//models/user');

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const users = require('./users');
const groups = require('./groups');
const messages = require('./messages');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.post('/tokens', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
          return res.status(500).send("Error on the server.\n" + err);
      }
      if (!user) {
          return res.status(404).send("No user found.");
      }

      var passwordInvalid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordInvalid) {
          return res.status(401).send({ auth: false, token: null });
      }

      var token = jwt.sign({ id: user._id }, config.key, { expiresIn: 8640000 });
      res.status(200).send({ auth: true, id: user._id, token: token });
  })
});

routes.use('/users', users);
routes.use('/groups', groups);
routes.use('/messages', messages);

module.exports = routes;