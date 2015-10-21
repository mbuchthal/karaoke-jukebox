var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var createQR = require(__dirname + '/../../lib/qrcode_generate');

describe('encoding a QR code', function() {
  it('should be able to create a new qr code', function() {
    var str = createQR('unit test QR Generate', 'svg');
    expect(str.indexOf('<svg')).to.eql(0);
  });
});
