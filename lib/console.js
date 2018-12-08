
'use strict';

module.exports = function(lando, defaults) {
  var versions = [
    'latest',
  ];

  // TODO document service options
  var services = function(name, config) {
    var consoleService = {
      // schickling/beanstalkd-console uses an Alpine-based image,
      // which doesn't play as nicely with Lando. Use our own image,
      // which is quite similar
      image: 'sitecrafting/beanstalkd-console:latest'
    };

    // set the internal port for beanstalkd_console
    var port = config.port || defaults.CONSOLE_HTTP_PORT;

    var forward = [port, defaults.CONSOLE_HTTP_PORT].join(':');
    // expose our console service on port
    consoleService.ports = [forward];

    // initialize environment variables
    consoleService.environment = {};

    // set up a beanstalkd server for console to listen on automatically
    if (config.beanstalkd_host) {
      // determine which port our beanstalkd queue is listening on
      var beanstalkPort = config.beanstalkd_port || defaults.BEANSTALKD_PORT;

      // tell beanstalkd-console to watch our main beanstalkd service
      consoleService.environment = {
        'BEANSTALK_SERVERS': config.beanstalkd_host + ':' + beanstalkPort
      };
    }

    // configure authentication credentials
    if (config.auth_username && config.auth_password) {
      consoleService.environment.AUTH = 'enable';
      consoleService.environment.AUTH_USERNAME = config.auth_username;
      consoleService.environment.AUTH_PASSWORD = config.auth_password;
    }

    // override the CMD directive with our custom port
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
      // TODO figure out proxy URL
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
