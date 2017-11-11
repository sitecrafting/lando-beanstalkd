/**
 * I see your ridiculous example, and I raise you one ridiculous plugin.
 *
 * https://docs.devwithlando.io/dev/plugins.html
 * @name example-plugin
 */

'use strict';

module.exports = function(lando) {

  lando.events.on('post-bootstrap', 3, function addBeanstalk(lando) {
    lando.services.add('beanstalkd', require('./lib/services')(lando));
  });

};
