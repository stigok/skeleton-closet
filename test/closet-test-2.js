var helpers = require('./helpers')
var expect = require('chai').expect
var closet = require('../lib/closet')

describe("closet", function () {

  it('should copy contents from source to target', function (done) {
    closet.copy(source, target, function (err) {
      expect(err).to.not.exist
      expect(helpers.copyOf(target, source)).to.be.true
      done()
    })
  })

})
