
'use strict';

module.exports = function(lando, defaults) {
  var versions = [
    'latest',
  ];

  var services = function(name, config) {
    var console = {
      image: 'schickling/beanstalkd-console:latest',
      // TODO portforward
      // TODO internal port
      ports: ['12080:2080'],
      environment: {
        // tell beanstalkd-console to watch our main beanstalkd service
        // TODO configure port
        'BEANSTALK_SERVERS': config.beanstalkd_host + ':' + defaults.BEANSTALKD_PORT
      },
      // the CMD defined in the Dockerfile injects a BEANSTALK_SERVERS
      // env variable; we don't want that here
      command: 'php -S 0.0.0.0:2080 -t /source/public',
    };

    var services = {};

    services[name] = console;

    return services;
  };

  var info = function() {
    // generic info
    return {};
  };

  /*
   * Nothing special here
   */
  var volumes = function() {
    return {data: {}};
  };

  /*
   * Nothing special here
   */
  var networks = function() {
    return {};
  };

  return {
    info: info,
    networks: networks,
    services: services,
    versions: versions,
    volumes: volumes,
    configDir: __dirname,
  };
};
