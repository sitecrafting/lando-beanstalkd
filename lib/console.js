
'use strict';

module.exports = function(lando, defaults) {
  var versions = [
    'latest',
  ];

  var services = function(name, config) {
    var consoleService = {
      // TODO custom image support
      image: 'schickling/beanstalkd-console:latest'
    };

    // set the internal port for beanstalkd_console
    var port = config.port || defaults.CONSOLE_HTTP_PORT;

    // expose our console service on port
    consoleService.ports = [port];

    // set up a beanstalkd server for console to listen on automatically
    if (config.beanstalkd_host) {
      // determine which port our beanstalkd queue is listening on
      var beanstalkPort = config.beanstalkd_port || defaults.BEANSTALKD_PORT;

      // tell beanstalkd-console to watch our main beanstalkd service
      consoleService.environment = {
        'BEANSTALK_SERVERS': config.beanstalkd_host + ':' + beanstalkPort
      };
    }

    // the CMD defined in the Dockerfile injects a BEANSTALK_SERVERS
    // env variable; we don't want that here
    consoleService.command = 'php -S 0.0.0.0:'+port+' -t /source/public';

    var services = {};

    services[name] = consoleService;

    return services;
  };

  var info = function(name, config) {
    // generic info
    return {
      internal_connection: {
        host: name,
        port: config.port || defaults.CONSOLE_HTTP_PORT,
      },
      external_connection: {
        host: 'localhost',
        port: config.port || defaults.CONSOLE_HTTP_PORT,
      },
    };
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
