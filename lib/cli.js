
'use strict';

module.exports = function(lando, defaults) {

  var versions = [
    'latest',
  ];

  var services = function(name, config) {

    var cli = {
      image: 'sitecrafting/beanstalkd-cli:latest',
      command: '/bin/sh -c "tail -f /dev/null"', // run forever
    };

    // set the internal port for beanstalkd-cli to connect to
    var port = config.port || defaults.BEANSTALKD_PORT;

    // expose the port
    cli.ports = [port];

    var services = {};

    services[name] = cli;

    return services;

  };

  /*
   * Nothing special here
   */
  var info = function() {
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
