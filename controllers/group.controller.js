const Group = require('../models/group');

module.exports = {
  single: (id, fields) => {
    return new Promise((resolve) => {
      Group.findById(id, fields)
      .populate('users')
      .exec((err, group) => {
        if(err)   return resolve({success: false, code: 500, content: "error occured"})
        if(!group) return resolve({success: false, code: 404, content: "no group found"})
        return resolve({success: true, code: 200, content: group});
      });
    });
  },
  createSingle: (attributes) => {
    return new Promise((resolve) => {
      attributes['_id'] = attributes.id
      Group.create(attributes, (err, group) => {
        if(err || !group) return resolve({success: false, code: 422, content: err.message});
        return resolve({success: true, code: 201, content: group});
      });
    });
  },
  updateSingle: (id, attributes) => {
    return new Promise((resolve) => {
      Group.findByIdAndUpdate(
        id,
        { $set: attributes },
        { new: true, upsert: true, runValidators: true },
        (err, group) => {
          if(err)   return resolve({success: false, code: 422, content: err})
          if(!group) return resolve({success: false, code: 404, content: "no group found"})
          return resolve({success: true, code: 200, content: group});
        });
    });
  },

  deleteSingle: (id) => {
    return new Promise((resolve) => {
      Group.remove({ _id: id }, (err) => {
        if (err) return resolve({ success: false, code: 500, content: "Error deleting group"});
        return resolve({success: true, code: 204, content: 'no content' });
      });
    });
  },

  many: (filter, fields, options) => {
    return new Promise((resolve) => {
      Group.find(filter, fields, options)
      .populate('users')
      .exec(function(err, groups) {
          if (err || !groups) return resolve({success: false, code: 500,content: "Error fetching groups"});
          return resolve({success: true, code: 200, content: groups});
      });
    });
  },

}
