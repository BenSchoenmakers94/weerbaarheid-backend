const UserController = require('../controllers/user.controller')
const ResourceSerializer = require('../serializers/resourceSerializer');
const router = require('express').Router();
const messageRoutes = require('./message.route');

const VerifyToken = require('../helpers/verifyToken');
const IsAuthorized = require('../helpers/isAuthorized');
const HasRole = require('../helpers/hasRole');
const DeserializePayload = require('../helpers/deserializePayload');

router.route('/')
    .get([VerifyToken, HasRole], async (req, res) => {
      let result = await UserController.many(req.where, req.fields, req.options)
      if(result.success) {
        if(req.format === 'HTML') {
          return res.render('userSingle', {users: users});
        }
        let users = ResourceSerializer.serialize('User', result.content, { meta: { pagination: req.options, filters: req.where } });
        return res.status(result.code).send(users);
      }
      return res.status(result.code).send(result.content)
    })
    .post([DeserializePayload], async (req, res) => {
      let result = await UserController.createSingle(req.payload, req.params.groupId);
      if(result.success) {
        let user = ResourceSerializer.serialize('User', result.content);
        return res.status(result.code).send(user);
      }
      return res.status(result.code).send(result.content);
    });

router.use('/:userId/messages',
  [(req, res, next) => { 
    req.userId = req.params.userId;
    next();
  },
    VerifyToken
  ],
  messageRoutes
);

router.route('/:userId')
    .get([VerifyToken, HasRole], async (req, res) => {
        let result = await UserController.single(req.params.userId, req.fields);
        if(result.success) {
          if(req.format === 'HTML') {
            return res.render('userSingle', {users: [result.content]});
          }
          let user = ResourceSerializer.serialize('User', result.content);
          return res.status(result.code).send(user);
        }
        return res.status(result.code).send(result.content)
    })
    .patch([VerifyToken, IsAuthorized, DeserializePayload], async (req, res) => {
        let result = await UserController.updateSingle(req.params.userId, req.payload);
        if(result.success) {
          let user = ResourceSerializer.serialize('User', result.content);
          return res.status(result.code).send(user);
        }
        return res.status(result.code).send(result.content);
    })
    .delete([VerifyToken, HasRole], async (req, res) => {
      let result = await UserController.deleteSingle(req.params.id);
      return res.status(result.code).json(result.content);
    });

module.exports = router;
