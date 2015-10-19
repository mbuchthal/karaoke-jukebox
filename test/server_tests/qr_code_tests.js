var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var createQR = require(__dirname + '/../../lib/qrcode_generate');

describe('encoding a QR code', function() {
  before(function() {
    createQR('test QR', 'pdf');
  });

  after(function() {
    fs.unlink(__dirname + '/../../output.pdf');
  });

  it('should be able to create a new qr code', function(done) {
    var wasItCreated;
    var dir = fs.readdir(__dirname + '/../../', function(err, files) {
      for (var file in files) {
        if (files[file] === 'output.pdf') {
          wasItCreated = true;
        }
      }
      expect(wasItCreated).to.eql(true);
      done();
    });
  });
});
