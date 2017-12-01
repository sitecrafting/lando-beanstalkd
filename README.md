# lando-beanstalkd

A [Beanstalk](https://kr.github.io/beanstalkd/) service for [Lando](https://docs.devwithlando.io)

*NOTE: This codebase is, like, totally alpha status rn*

## Usage

Install this repo as a Lando plugin:

```
git clone git@github.com:sitecrafting/lando-beanstalkd.git ~/.lando/plugins/beanstalkd
```

Then, declare a service of type `beanstalkd` in your `.lando.yml`:

```
name: my-awesome-app
recipe: lamp # ...or whatever you want
services:
  queue:
    type: beanstalkd
```

Running `lando start` will start a `beanstalkd` server listening on port 11300 inside your default `appserver` container. Use any [client library](https://github.com/kr/beanstalkd/wiki/client-libraries) within your main app to talk to it (most libraries know to look at 11300 by default). Just configure the client code with hostname `queue` (or whatever you decide to name your service in .lando.yml).

## Options

Any of the following options can be specified inside your beanstalkd service block (in the above example, the `queue` block).

### Port `int`

Tell `beanstalkd` to listen at a non-default port:

```
...
    port: 11333
```

If you do this, you'll want to make sure to bind any client libraries to the same port within your main app.

### Portforward `boolean|int`

Expose the `beanstalkd` service on your host machine. This is useful for interacting directly with `beanstalkd` from your host machine, for example using [`beanstalkd-cli`](https://github.com/schickling/beanstalkd-cli).

If `true`, forwards the port set in the `port` option (or the default 11300) from your host machine:

```
...
    portforward: true
```

If an integer is specified, this forwards the port on your host machine to `port` inside the container.

## TODO

* unit tests
* more `beanstalkd` options
* option for injecting/exposing a (working) [`beanstalkd-console`](https://github.com/ptrofimov/beanstalk_console) service
* expose  [`beanstalkd-cli`](https://github.com/schickling/beanstalkd-cli) tooling