var q = require('q');
var mongoose = require('mongoose');

User = mongoose.model('User')

function fillTestUsers(){
    var testData = [
        {
            firstName: 'Jan',
            lastName: 'Jansen',
            birthDate: '1986-03-26T00:00:00.407Z',
            postalCode: '1111 AB',
            houseNumber: 1
        },
        {
            firstName: 'Piet',
            lastName: 'Pietersen',
            birthDate: '1993-08-21T00:00:00.407Z',
            postalCode: '2222CD',
            houseNumber: 2
        },
        {
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

fillTestUsers();

module.exports = function(){
	q.fcall(fillTestUsers);
}