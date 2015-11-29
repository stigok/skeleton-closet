var cli = require('cli');
var pkg = require('./package.json');
var path = require('path');

cli.setApp(pkg.name, pkg.version);
cli.enable('help', 'version');

function writeConfig(name, value) {
  process.env[pkg.name + name] = value;
}

function readConfig(name) {
  return process.env[pkg.name + name];
}

var options = cli.parse({
  "target":      ['t', 'copy source skeleton to target path', 'path', './'],
  "source":      [false, 'set source to current directory '],
  "source-path": ['s', 'set source to specified path', 'path'],
  "info":        ['i', 'show current source path']
});

cli.main(function (args, options) {
  if (args.length > 0) {
    
  }

  // --info
  if (options.info) {
    console.log(readConfig('source'));
    process.exit(0);
  }

  // --source
  if (options.source) {
    var src = path.resolve(process.cwd, options.source);
    writeConfig('source', src);
    console.write('Source set to ' + src);
    process.exit(0);
  }
});
