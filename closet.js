var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var appDir = path.dirname(require.main.filename);
var configPath = path.join(appDir, 'source-path.config');

module.exports.copy = function (source, target, cb) {
  if (arguments.length === 2) {
    cb = target;
    target = source;
    source = this.getSourcePath();
  }

  if (!this.getSourcePath()) {
    return cb('no source path has been set');
  }

  console.log('copy', source, target);
  ncp(source, target, cb);
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
