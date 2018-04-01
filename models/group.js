var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.String, ref: 'User' }]
});

module.exports = mongoose.model('Group', groupSchema);


//Functional ID on Groups --DONE
//Patch requests on User --DONE
//Relationships + Populate --DONE
//Role-based authentication
//Messages
//

//Iemand met een token mag nu zomaar iemand anders aanpassen? --Role-based lost dit op?
//Rollen < Administrator mogen alleen zichzelf aanpassen
//if role < administrator then is _id of pendingUpdate the _id of RequestingUser?

//Email should be unique to make sure only the dedicated user has access to the content --DONE

//Token set time unexpired --DONE

//Group add members
//On user.Patch --> if req.payload.group != null --> group.findById --> callback --> 
//if (group.members has id of user --> do nothing)  else group.members.push(id of current user)