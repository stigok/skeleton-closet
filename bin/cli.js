#!/usr/bin/env node

var cli = require('cli');
var pkg = require('../package.json');
var path = require('path');
var closet = require('../closet.js');
var fs = require('fs');

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
  // --info
  if (options.info) {
    var source = closet.getSourcePath() || 'not set';
    console.log('Current source skeleton is %s', source);
    return process.exit(0);
  }

  // --source
  if (options.source || options['source-path']) {
    var src = options['source-path'] || process.cwd();
    closet.saveSourcePath(src);
    console.log('Source skeleton set to ' + src);
    return process.exit(0);
  }

  // copy into current directory
  if (args.length === 0) {
    var files = fs.readdirSync(process.cwd());
    if (files.length > 0 && !options.force) {
      console.error('This directory is not empty. use -f or --force to ignore this (will overwrite)');
      return process.exit(1);
    }
    closet.copy(process.cwd(), function (err) {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('Created new project folder %s', process.cwd());
    });
  }

  // copy into specified directory
  if (args.length === 1) {
    var name = args[0];
    var target = path.join(process.cwd(), name);

    if (fs.existsSync(target)) {
      console.error('path already exists');
      return process.exit(1);
    }

    closet.copy(target, function (err) {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('created new project folder');
    });
  }
});
