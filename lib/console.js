(function(){
'use strict';

module.exports = function(config) {
  return {
    image: 'schickling/beanstalkd-console:latest',
    ports: ['12080:2080'],
    environment: {},
  };
};

})();
