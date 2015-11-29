var spawn = require('child_process').spawn;
var _ = require('underscore');
var rimraf = require('rimraf');
var fs = require('fs');

module.exports.run = function (cwd, options, cb) {
  // Run module with specified arguments
  var args = ['../index.js'].concat(options);
  var proc = spawn('node', args, {
    cwd: cwd
  });
  proc.on('close', function (code) {
    if (code !== 0) {
      return cb('Returned with error code ' + code);
    }
    return cb();
  });
};

// Determine if target directory contents are identical to source
module.exports.isCopyOf = function (target, source) {
  var a = fs.readdirSync(target);
  var b = fs.readdirSync(source);
  console.log('copyOf', a, b);
  return _.isEqual(a, b);
};

module.exports.folderExist = function (target) {
  var stats = fs.statSync(target);
  return stats.isDirectory();
};

module.exports.recreate = function (path, done) {
  // Delete all contents in temp dir
  rimraf(path, function () {
    // Recreate empty dir
    fs.mkdir(path, done);
  });
};
