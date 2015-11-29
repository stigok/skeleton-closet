var expect = require('chai').expect
var helpers = require('./helpers.js')
var async = require('async')

describe("closet", function () {
  var rootFolder = './.tmp'
  var targetFolder = rootFolder + '/target-folder'
  var sourceFolder = './test'

  describe("should copy predefined skeleton to a directory", function () {

    beforeEach("recreate empty test environment", function (done) {
      //async.series([
      //  function (next) { helpers.recreate(rootFolder, next) },
      //  function (next) { helpers.recreate(sourceFolder, next) },
      //  function (next) { helpers.recreate(targetFolder, done) },
      //])
      helpers.recreate(rootFolder, done);
    })
    afterEach("recreate empty test environment", function (done) {
      helpers.recreate(rootFolder, done);
    })

    it("with no options", function (done) {
      helpers.run(rootFolder, [], function (err) {
        expect(err).to.not.exist
        expect(helpers.isCopyOf(rootFolder, sourceFolder)).to.be.true
        done()
      })
    })

    it("with specified target directory", function (done) {
      expect(helpers.folderExist(targetFolder)).to.be.false
      helpers.run(rootFolder, 'test-project', function (err) {
        expect(err).to.not.exist
        expect(helpers.folderExist(rootFolder + '/test-project')).to.be.true
        expect(helpers.isCopyOf(rootFolder + '/test-project', sourceFolder)).to.be.true
        done()
      })
    })
  })
})
