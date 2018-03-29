var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true, unique: true }
});

mongoose.model('Group', groupSchema);

module.exports = mongoose.model('Group');


//Functional ID on Groups --DONE
//Patch requests on User --DONE
//Relationships + Populate
//Role-based authentication
//Notes
//

//Iemand met een token mag nu zomaar iemand anders aanpassen? --Role-based lost dit op?
//Rollen < Administrator mogen alleen zichzelf aanpassen
//if role < administrator then is _id of pendingUpdate the _id of RequestingUser?

//Email should be unique to make sure only the dedicated user has access to the content --DONE

//Token set time unexpired