var helpers = require('./helpers');

console.log(helpers.lando);

var beanstalkd = require('./../lib/beanstalkd');

describe('beanstalkd-console service', function() {

  describe('with defaults', function() {

    it('returns a simple setup', function() {

      expect(beanstalkd).to.be.a('function')

    });

  });

});
