
'use strict';

module.exports = function(config) {
  var beanstalk = {
    image: 'schickling/beanstalkd:latest',
  };

  var command = ['beanstalkd'];

  // initialize the port
  var port = config.port || DEFAULT_PORT;
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

  beanstalk.command = command.join(' ');

  return beanstalk;
};
