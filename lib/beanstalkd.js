
'use strict';

module.exports = function(lando, defaults) {
  /*
   * Util
   */
  var _ = lando.node._;

  var versions = [
    'latest',
  ];

  var services = function(name, config) {
    var beanstalk = {
      // TODO support different image
      image: 'schickling/beanstalkd:latest',
    };

    var command = ['beanstalkd'];

    // initialize the port
    var port = config.port || defaults.BEANSTALKD_PORT;
    command.push('-p', port);

    // allow port-forwarding
    if (config.portforward === true) {
      beanstalk.ports = [port];
    } else if (config.portforward) {
      beanstalk.ports = [config.portforward+':'+port];
    }

    // allow user to configure wal dir
    if (config.waldir) {
      command.push('-b', config.waldir);
    }

    // allow user to config beanstalkd user inside the container
    if (config.user) {
      command.push('-u', config.user);
    }

    // TODO other beanstalkd options?
    //  -f MS    fsync at most once every MS milliseconds (use -f0 for "always fsync")
    //  -F       never fsync (default)
    //  -l ADDR  listen on address (default is 0.0.0.0)
    //  -z BYTES set the maximum job size in bytes (default is 65535)
    //  -s BYTES set the size of each wal file (default is 10485760)
    //             (will be rounded up to a multiple of 512 bytes)
    //  -n       do not compact the binlog

    // compose the final command
    beanstalk.command = command.join(' ');

    var services = {};

    services[name] = beanstalk;

    return services;
  };

  var info = function(name, config) {
    // generic info
    var info = {
      internal_connection: {
        host: name,
        port: config.port || defaults.BEANSTALKD_PORT,
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
