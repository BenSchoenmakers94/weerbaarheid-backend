const Message = require('../models/message');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const addMessageToUser = require('../helpers/addMessageToUser');

module.exports = {
  single: (id, fields) => {
    return new Promise((resolve) => {
      Message.findById(id, fields)
      .exec((err, message) => {
        if(err)   return resolve({success: false, code: 500, content: "error occured"})
        if(!message) return resolve({success: false, code: 404, content: "no message found"})
        return resolve({success: true, code: 200, content: message});
      });
    });
  },
  createSingle: (attributes, userId) => {
    return new Promise((resolve) => {
      attributes['_id'] = attributes.id
      Message.create(attributes, (err, message) => {
        if(err || !message) return resolve({success: false, code: 422, content: err.message});
        if(userId != undefined) { 
          addMessageToUser(message._id, userId).then((result) => {
            if(!result.success) return resolve(result);
          });
        }
        return resolve({success: true, code: 201, content: message});
      });
    });
  },
  updateSingle: (id, attributes) => {
    return new Promise((resolve) => {
      Message.findByIdAndUpdate(
        id,
        { $set: attributes },
        { new: true, upsert: true, runValidators: true },
        (err, message) => {
          if(err)   return resolve({success: false, code: 422, content: err})
          if(!message) return resolve({success: false, code: 404, content: "no message found"})
          return resolve({success: true, code: 200, content: message});
        });
    });
  },

  deleteSingle: (id) => {
    return new Promise((resolve) => {
      Message.remove({ _id: id }, (err) => {
        if (err) return resolve({ success: false, code: 500, content: "Error deleting message"});
        return resolve({success: true, code: 204, content: 'no content' });
      });
    });
  },

  many: (filter, fields, options) => {
    return new Promise((resolve) => {
      Message.find(filter, fields, options)
      .exec((err, messages) => {
          if (err || !messages) return resolve({success: false, code: 500,content: "Error fetching messages"});
          return resolve({success: true, code: 200, content: messages});
      });
    });
  },

  manyForUser: (filter, fields, options, userId) => {
    return new Promise((resolve) => {
      User.findById(userId).populate({
        path: 'messages',
        match: filter
      }).exec((err, user) => {
        return resolve({success: true, code: 200, content: user.messages});
      });
    });
  }
}
