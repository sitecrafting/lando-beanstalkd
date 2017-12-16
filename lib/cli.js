
'use strict';

module.exports = function() {

  var versions = [
    'latest',
  ];

  var services = function(name) {

    var cli = {
      image: 'sitecrafting/beanstalkd-cli:latest',
    };

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
