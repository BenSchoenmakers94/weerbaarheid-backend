const User = require('../models/user');
const bcrypt = require('bcryptjs');
const addUserToGroup = require('../helpers/addUserToGroup');

module.exports = {
  single: (id, fields) => {
    return new Promise((resolve) => {
      User.findById(id, fields)
      .populate('messages')
      .exec((err, user) => {
        if(err)   return resolve({success: false, code: 500, content: "error occured"})
        if(!user) return resolve({success: false, code: 404, content: "no user found"})
        return resolve({success: true, code: 200, content: user});
      });
    });
  },
  createSingle: (attributes, groupId) => {
    return new Promise((resolve) => {
      if(attributes.password == undefined) return resolve({success: false, code: 422, content: "User validation failed: password missing"});
      attributes.password = bcrypt.hashSync(attributes.password, 8)
      attributes['_id'] = attributes.id
      User.create(attributes, (err, user) => {
        if(err || !user) return resolve({success: false, code: 422, content: err.message});
        groupToAdd = groupId || 'Client'
        addUserToGroup(null, user._id, groupToAdd);
        return resolve({success: true, code: 201, content: user});
      });
    });
  },
  updateSingle: (id, attributes) => {
    return new Promise((resolve) => {
      User.findByIdAndUpdate(
        id,
        { $set: attributes },
        { new: true, upsert: true, runValidators: true },
        (err, user) => {
          if(err)   return resolve({success: false, code: 422, content: err})
          if(!user) return resolve({success: false, code: 404, content: "no user found"})
          console.log(user.firstName)
          return resolve({success: true, code: 200, content: user});
        });
    });
  },

  deleteSingle: (id) => {
    return new Promise((resolve) => {
      User.remove({ _id: id }, (err) => {
        if (err) return resolve({ success: false, code: 500, content: "Error deleting user"});
        return resolve({success: true, code: 204, content: 'no content' });
      });
    });
  },

  many: (filter, fields, options) => {
    return new Promise((resolve) => {
      User.find(filter, fields, options)
      .populate('messages')
      .exec(function(err, users) {
          if (err || !users) return resolve({success: false, code: 500,content: "Error fetching users"});
          return resolve({success: true, code: 200, content: users});
      });
    });
  },

}
