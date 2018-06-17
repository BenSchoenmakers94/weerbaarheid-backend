const GroupController = require('../controllers/group.controller')
const ResourceSerializer = require('../serializers/resourceSerializer');
const router = require('express').Router();
const userRoutes = require('./user.route');

const DeserializePayload = require('../helpers/deserializePayload');

router.route('/')
    .get(async (req, res) => {
      let result = await GroupController.many(req.where, req.fields, req.options)
      if(result.success) {
        if(req.format === 'HTML') {
          return res.render('groupSingle', {groups: groups});
        }
        let groups = ResourceSerializer.serialize('Group', result.content, { meta: { pagination: req.options, filters: req.where } });
        return res.status(result.code).send(groups);
      }
      return res.status(result.code).send(result.content)
    })
    .post([DeserializePayload], async (req, res) => {
      let result = await GroupController.createSingle(req.payload);
      if(result.success) {
        let group = ResourceSerializer.serialize('Group', result.content);
        return res.status(result.code).send(group);
      }
      return res.status(result.code).send(result.content);
    });

router.use('/:groupId/users',
  (req, res, next) => { 
    req.groupId = req.params.groupId;
    next();
  },
  userRoutes
);

router.route('/:groupId')
    .get(async (req, res) => {
        let result = await GroupController.single(req.params.groupId, req.fields);
        if(result.success) {
          if(req.format === 'HTML') {
            return res.render('groupSingle', {groups: [result.content]});
          }
          let group = ResourceSerializer.serialize('Group', result.content);
          return res.status(result.code).send(group);
        }
        return res.status(result.code).send(result.content)
    })
    .delete(async (req, res) => {
      let result = await GroupController.deleteSingle(req.params.id);
      return res.status(result.code).json(result.content);
    });

module.exports = router;
