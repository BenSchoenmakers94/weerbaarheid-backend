var assert = require('assert');
var expect = require('chai').expect;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});



var User = require('../models/user');
var Message = require('../models/user');
var group = require('../models/user');

describe('user', function() {
    describe('same last name', function() {
        User
    });

    it('should be invalid if id is empty', function(done) {
        var m = new User();

        m.validate(function(err) {
            expect(err.errors._id).to.exist;
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            expect(err.errors.postalCode).to.exist;
            expect(err.errors.houseNumber).to.exist;
            expect(err.errors.birthDate).to.exist;
            done();
        });
    });
});
