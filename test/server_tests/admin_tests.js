var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var user = require(__dirname + '/../../models/user');
var serverURL = 'http://localhost:3000';

describe('admin', function() {
  beforeEach(function(done) {
    chai.request(serverURL)
      .get('/api/user')
      .set('id', '12345')
      .set('nick', 'guestperson')
      .end(function(err, data) {
        done();
      });
  });

  it('should be able to signin to admin');

  it('should accept a user', function(done) {
    chai.request(serverURL)
      .post('/api/acceptUser')
      .set('id', '12345')
      .set('nick', 'guestperson')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(202);
        expect(res.body.msg).to.eql('User has been accepted');
        done();
      });
  });

  it('should decline a user', function(done) {
    chai.request(serverURL)
      .post('/api/declineUser')
      .set('id', '12345')
      .set('nick', 'guestperson')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('User has been declined');
        done();
      });
  });

  it('should rename a user', function(done) {
    chai.request(serverURL)
      .patch('/api/renameUser')
      .set('id', '12345')
      .set('nick', 'guestperson')
      .send({nick: 'newguy'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('User renamed to: newguy');
        done();
      });
  });

  it('should generate a static qr code', function(done) {
    chai.request(serverURL)
      .post('/api/staticQR')
      .send({qrMsg: 'your bar name here'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('QR Generated');
        expect(res.body.QR.indexOf('<svg')).to.eql(0);
        done();
      });
  });
});
