
'use strict';

module.exports = function(lando) {
  /*
   * Util
   */
  var _ = lando.node._;

  var versions = [
    'latest',
  ];

  var services = function(name, config) {
    var services = {};

    services[name] = require('./beanstalkd')(config);

    if (config.console) {
      var consoleName = 'beanstalkdconsole';

      if (config.console !== true && config.console.name) {
        consoleName = config.console.name;
      }

      console.log('console service: '+consoleName);

    }

    return services;
  };

  var info = function(name, config) {
    // generic info
    var info = {
      internal_connection: {
        host: name,
        port: config.port || 11300,
      },
      external_connection: {
        host: 'localhost',
        port: config.portforward || 'not forwarded',
      },
    };

    _.forEach(['waldir', 'user'], function(key) {
      if (!_.isEmpty(config[key])) {
        info[key] = config[key];
      }
    });

    return info;
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
