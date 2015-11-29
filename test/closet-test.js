var expect = require('chai').expect
var helpers = require('./helpers.js')

describe("closet", function () {
  var cwd = './.tmp'
  var target = 'target-folder'
  var source = 'source-folder'
  var runwithargs = helpers.runwithargs({cwd: cwd})

  describe("should copy predefined skeleton to a directory", function () {

    beforeEach("recreate empty test environment", function (done) {
      helpers.cleanup(cwd, done)
    })
    afterEach("recreate empty test environment", function (done) {
      helpers.cleanup(cwd, done)
    })

    it("with no options", function (done) {
      helpers.runwithargs('', function (err) {
        expect(err).to.not.exist
        expect(helpers.isCopyOf('./', source)).to.be.true
        done()
      })
    })

    it("with specified target directory", function (done) {
      helpers.runwithargs(target, function (err) {
        expect(err).to.not.exist
        expect(helpers.folderExist(target)).to.be.true
        expect(helpers.isCopyOf(target, source)).to.be.true
        done()
      })
    })
  })

  it("should ")
})
