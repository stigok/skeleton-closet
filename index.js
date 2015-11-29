var cli = require('cli');
var pkg = require('./package.json');
var path = require('path');
var closet = require('./lib/closet.js');
var fs = require('fs');

cli.setApp(pkg.name, pkg.version);
cli.enable('help', 'version');

cli.parse({
  'target': ['t', 'copy source skeleton to target path', 'path', './'],
  'source': [false, 'set source to current directory'],
  'source-path': ['s', 'set source to specified path', 'path'],
  'info': ['i', 'show current source path']
});

cli.main(function (args, options) {
  if (args.length > 0) {
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

  // --info
  if (options.info) {
    var source = closet.getSourcePath();
    console.log('source skeleton is ' + (source || 'not set'));
    return process.exit(0);
  }

  // --source
  if (options['source-path']) {
    var src = path.resolve(process.cwd(), options['source-path']);
    closet.saveSourcePath(src);
    console.log('source skeleton set to ' + src);
    return process.exit(0);
  }
});
