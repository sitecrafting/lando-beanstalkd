/**
 * Load beanstalkd, beanstalkd-console, and beanstalk-cli services
 *
 * https://github.com/sitecrafting/lando-beanstalkd
 * @name lando-beanstalkd
 */

'use strict';

module.exports = function(lando) {

  // inject our beanstalk-related services
  lando.events.on('post-bootstrap', 3, function addBeanstalkServices(lando) {
    // defaults shared between services
    var defaults = {
      BEANSTALKD_PORT: 11300,
      CONSOLE_HTTP_PORT: 2080,
    };

    lando.services.add(
      'beanstalkd',
      require('./lib/beanstalkd')(lando, defaults)
    );

    lando.services.add(
      'beanstalkd_console',
      require('./lib/console')(lando, defaults)
    );

    lando.services.add(
      'beanstalkd_cli',
      require('./lib/cli')(lando, defaults)
    );
  });

};
