var q = require('q');
var mongoose = require('mongoose');

User = mongoose.model('User');
Group = mongoose.model('Group');

var userID1 = new mongoose.Types.ObjectId();
var userID2 = new mongoose.Types.ObjectId();
var userID3 = new mongoose.Types.ObjectId();

function fillTestUsers(){
    var testData = [
        {
            _id: userID1,
            firstName: 'Jan',
            lastName: 'Jansen',
            birthDate: '1986-03-26T00:00:00.407Z',
            postalCode: '1111 AB',
            houseNumber: 1
        },
        {
            _id: userID2,
            firstName: 'Piet',
            lastName: 'Pietersen',
            birthDate: '1993-08-21T00:00:00.407Z',
            postalCode: '2222CD',
            houseNumber: 2
        },
        {
            _id: userID3,
            firstName: 'Karel',
            lastName: 'Karelsen',
            birthDate: '2001-01-01T00:00:00.407Z',
            postalCode: '3333 DE',
            houseNumber: 3
        }
	];

	User.find({}).then(data => {
		// Als er nog geen users zijn vullen we de testdata
		if(data.length == 0){
			console.log('Creating users testdata');
			
			testData.forEach(function(user){
				new User(user).save();
			});
		} else{
			console.log('Skipping create users testdata, allready present');
		}
	});
};

function fillTestGroups(){
    var testData = [
        {
            groupName: 'Client',
            users: [userID1]
        },
        {
            groupName: 'Ouder',
            users: [userID2]
        },
        {
            groupName: 'Administrator',
            users: [userID3]
        }
    ];
    testData.forEach(function(group) {
        new Group(group).save();
    });
};

function populateUsers() {
    Group.findOne({ groupName: 'Client' }).populate('users').exec(function(err, group) {
        console.log('the user is '+group);
    });;
}

fillTestUsers();
fillTestGroups();
populateUsers();



module.exports = function(){
	q.fcall(fillTestUsers);
}