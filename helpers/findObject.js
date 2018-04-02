module.exports = type => {
  return (req, res, next, value) => {
    const obj = type.findById(new RegExp('^'+ value + '$', "i"), req.fields, function(err, obj) {
        if (obj) {
            req.object = obj;
            next();
          } else {
            return res.status(404).send('Invalid ID: ' + value + '.');
          }
    });
  };
};