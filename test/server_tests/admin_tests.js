var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var user = require(__dirname + '/../../models/user');
var io = require('socket.io-client');
var serverURL = 'http://localhost:3000';
var socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};
var socketURL = 'http://localhost:3000';
var socket;

describe('admin', function() {
  beforeEach(function(done) {
    socket = io.connect(socketURL, socketOptions);
    socket.on('connect', function() {
      chai.request(serverURL)
        .get('/api/user')
        .set('id', '12345')
        .set('nick', 'guestperson')
        .end(function(err, data) {
          socket.emit('registerUser', {id: '12345', nick: 'guestperson'});
          done();
        });
    });
  });

  it('should be able to signin to admin');

  it('should accept a user', function(done) {
    chai.request(serverURL)
      .post('/api/acceptUser')
      .send({id: '12345'})
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
      .send({id: '12345'})
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
      .send({id: '12345', nick: 'newguy'})
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
