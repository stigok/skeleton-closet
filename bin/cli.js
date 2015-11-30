#!/usr/bin/env node

var cli = require('cli');
var pkg = require('../package.json');
var path = require('path');
var closet = require('../closet.js');

cli.setApp(pkg.name, pkg.version);
cli.enable('help', 'version');

cli.parse({
  'target': ['t', 'copy source skeleton to target path', 'path', './'],
  'source': [false, 'set source to current directory'],
  'source-path': ['s', 'set source to specified path', 'path'],
  'force': ['f', 'copy even if target dir is not empty'],
  'info': ['i', 'show current source path']
});

cli.main(function (args, options) {
  // Current source skeleton info
  if (options.info) {
    console.log('Current source skeleton is %s', closet.getSourcePath() || 'not set');
    return process.exit(0);
  }

  // Set current source skeleton
  if (options.source || options['source-path']) {
    var src = options['source-path'] || process.cwd();
    closet.saveSourcePath(src);
    console.log('Source skeleton set to ' + src);
    return process.exit(0);
  }

  var source = options.source || closet.getSourcePath();
  var target = (args.length === 0) ? process.cwd() : path.join(process.cwd(), args[0]);
  var opts = {
    source: source,
    target: target,
    force: options.force
  };

  if (!source) {
    console.error('No source skeleton set');
    return process.exit(0);
  }

  closet.copy(opts, function (err) {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    console.log('Skeleton successfully raised at %s', target);
  });
});
