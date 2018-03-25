var q = require('q');
var mongoose = require('mongoose');

User = mongoose.model('User')

function fillTestUsers(){
    var testData = [
        {
            firstName: 'Jan',
            lastName: 'Jansen',
        },
        {
            firstName: 'Piet',
            lastName: 'Pietersen',
        },
        {
            firstName: 'Karel',
            lastName: 'Karelsen',
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

fillTestUsers();

module.exports = function(){
	q.fcall(fillTestUsers);
}