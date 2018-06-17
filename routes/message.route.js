const MessageController = require('../controllers/message.controller')
const ResourceSerializer = require('../serializers/resourceSerializer');
const router = require('express').Router();

const VerifyToken = require('../helpers/verifyToken');
const IsAuthorized = require('../helpers/isAuthorized');
const HasRole = require('../helpers/hasRole');
const CheckIfJSON = require('../helpers/checkIfJson');
const DeserializePayload = require('../helpers/deserializePayload');

router.all('*', CheckIfJSON);

router.route('/')
    .get([VerifyToken/* , HasRole */], async (req, res) => {
      let result = {}
      if(req.userId != undefined) {
        result = await MessageController.manyForUser(req.where, req.fields, req.options, req.userId)
      } else {
        result = await MessageController.many(req.where, req.fields, req.options)
      }

      if(result.success) {
        if(req.format === 'HTML') {
          return res.render('messageSingle', {messages: messages});
        }
        let messages = ResourceSerializer.serialize('Message', result.content, { meta: { pagination: req.options, filters: req.where } });
        return res.status(result.code).send(messages);
      }
      return res.status(result.code).send(result.content)
    })
    .post([VerifyToken, DeserializePayload], async (req, res) => {
      let result = await MessageController.createSingle(req.payload, req.params.groupId);
      if(result.success) {
        let message = ResourceSerializer.serialize('Message', result.content);
        return res.status(result.code).send(message);
      }
      return res.status(result.code).send(result.content);
    });

router.route('/:messageId')
    .get([VerifyToken, HasRole], async (req, res) => {
        let result = await MessageController.single(req.params.messageId, req.fields);
        if(result.success) {
          if(req.format === 'HTML') {
            return res.render('messageSingle', {messages: [result.content]});
          }
          let message = ResourceSerializer.serialize('Message', result.content);
          return res.status(result.code).send(message);
        }
        return res.status(result.code).send(result.content)
    })
    .patch([VerifyToken, HasRole, DeserializePayload], async (req, res) => {
        let result = await MessageController.updateSingle(req.params.id, req.payload);
        if(result.success) {
          let message = ResourceSerializer.serialize('Message', result.content);
          return res.status(result.code).send(message);
        }
        return res.status(result.code).send(result.content);
    })
    .delete([VerifyToken, IsAuthorized], async (req, res) => {
      let result = await MessageController.deleteSingle(req.params.id);
      return res.status(result.code).json(result.content);
    });

module.exports = router;
