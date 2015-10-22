var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var createQR = require(__dirname + '/../../lib/qrcode_generate');

describe('QR codes', function() {
  it('should be able to generate a qr code', function() {
    var str = createQR('unit test QR Generate', 'svg');
    expect(str.indexOf('<svg')).to.eql(0);
  });

  it('should be able to read a qr code');
});
