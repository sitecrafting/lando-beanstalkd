'use strict';

module.exports = function(config, name) {
  var DEFAULT_PORT = 11300;

  return {
    image: 'schickling/beanstalkd-console:latest',
    ports: ['12080:2080'],
    environment: {
      // tell beanstalkd-console to watch our main beanstalkd service
      'BEANSTALK_SERVERS': name + ':' + DEFAULT_PORT
    },
    // the CMD defined in the Dockerfile injects a BEANSTALK_SERVERS
    // env variable; we don't want that here
    command: 'php -S 0.0.0.0:2080 -t /source/public',
  };
};

