const routes = require('express').Router();
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/credentials');
const User = require('..//models/user');
const checkIfJson = require('../helpers/checkIfJson');
const externalAPI = require('../helpers/externalAPI');
const VerifyToken = require('../helpers/verifyToken');
const HasRole = require('../helpers/hasRole');
const CheckIfJSON = require('../helpers/checkIfJson.js');

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const users = require('./user.route');
const groups = require('./group.route');
const messages = require('./message.route');

routes.get('/', checkIfJson, (req, res) => {
    if (req.format === 'HTML') {
        res.render('index', { title: 'Punt Weerbaarheid API', message: 'Welcome to the Punt Weerbaarheid API!'});
    } else {
        res.status(200).json({ message: 'Connected!' });
    }
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
  });
});

routes.all('*', CheckIfJSON);

routes.use('/users', users);
routes.use('/groups', [VerifyToken, HasRole] , groups);
routes.use('/messages', [VerifyToken], messages);

module.exports = routes;
