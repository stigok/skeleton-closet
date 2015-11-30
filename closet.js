var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var appDir = path.dirname(require.main.filename);
var configPath = path.join(appDir, 'source-path.config');
var mkdirp = require('mkdirp');

module.exports.copy = function (options, cb) {
  if (!options.source || !options.target) {
    return cb('Missing arguments');
  }

  if (options.source === options.target) {
    return cb('Source and target paths are the same');
  }

  if (!fs.existsSync(options.source)) {
    return cb('Source path does not exist');
  }

  var targetExists = fs.existsSync(options.target);

  // Make sure target directory is empty
  if (targetExists && !options.force) {
    var files = fs.readdirSync(options.target);
    if (files.length > 0) {
      return cb('Target directory is not empty (use option force to ignore)');
    }
  } else {
    // Create target folder recursively if it doesn't exist
    mkdirp.sync(options.target);
  }

  ncp(options.source, options.target, cb);
};

module.exports.saveSourcePath = function (path) {
  fs.writeFileSync(configPath, path);
};

module.exports.getSourcePath = function () {
  var fd = fs.openSync(configPath, 'a+');
  var buf = fs.readFileSync(configPath, {flags: 'a+'});
  fs.closeSync(fd);
  var sourcePath = buf.toString();
  return (sourcePath.length > 0) ? sourcePath : null;
};
