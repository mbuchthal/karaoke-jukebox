var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var createQR = require(__dirname + '/../../lib/qrcode_generate');
var decodeQR = require(__dirname + '/../../lib/qrcode_decode');

describe('encoding a QR code', function() {
  before(function() {
    createQR('test QR', 'pdf', 'output');
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

describe('decoding a QR code', function() {
  before(function() {
    createQR('test QR decode', 'pdf', 'sampleQR');
  });

  after(function() {
    fs.unlink(__dirname + '/../../sampleQR.pdf');
  });

  it('should be able to decode an existing qr code', function(done) {
    var decoded = decodeQR(__dirname + '/../../sampleQR.pdf');
    expect(decoded).to.eql('test QR decode');
  });

});
