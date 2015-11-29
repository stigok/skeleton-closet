var spawn = require('child_process').spawn;
var _ = require('underscore');
var rimraf = require('rimraf');
var fs = require('fs');

module.exports.runwithargs = function () {
  var option = arguments[0];
  var cb = arguments[1];

  switch (typeof option) {
    case 'object':
      // Apply options and return a new instance of itself
      _.extend(this, option);
      return this;
    case 'string':
      // Run module with specified arguments
      var args = ['../index.js'];
      args.push(option.split(' '));
      var proc = spawn('node', args, {
        cwd: this.cwd
      });
      proc.on('close', function (code) {
        if (code !== 0) {
          return cb('Returned error ' + code);
        }
        return cb();
      });
      break;
    default:
      return cb('Invalid options');
  }
};

// Determine if target directory contents are identical to source
module.exports.isCopyOf = function (target, source, cb) {
  fs.readdir(target, function (err, a) {
    if (err) throw err;
    fs.readdir(source, function (e, b) {
      if (e) throw err;
      return _.isEqual(a, b);
    });
  });
  async.waterfall([
    function (next) {
      fs.readdir(target, next);
    },
    function (next) {
      fs.readdir(source, next);
    }
  ], function (err) {
    if (err) {
      throw err;
    }
  });
};

module.exports.cleanup = function (path, done) {
  // Delete all contents in temp dir
  rimraf(path, function () {
    // Recreate empty dir
    fs.mkdir(path, done);
  });
};
