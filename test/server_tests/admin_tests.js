var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var mongoose = require('mongoose');
var httpBasic = require(__dirname + '/../../lib/http_basic');

var user = require(__dirname + '/../../models/user');
var io = require('socket.io-client');
var serverURL = 'http://localhost:3000';
var socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};
var socketURL = 'http://localhost:3000';
var socket;

describe('http basic: header authorization', function() {
  it('should be able to handle http basic auth', function() {
    var req = { //simulate request
      headers: {
        authorization: 'Basic ' + (new Buffer('testuser1:foobar123')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testuser1');
      expect(req.auth.password).to.eql('foobar123');
    });
  });
});

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

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

//create a new admin account
  it('should be able to create a new admin', function(done) {
    chai.request(serverURL)
      .post('/api/signupAdmin')
      .send({username: 'testAdmin', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token.length).to.be.above(0);
        done();
      });
  });

  it('should be able to signin to admin', function(done) {
    chai.request(serverURL)
      .get('/api/signinAdmin')
      .auth({username: 'testAdmin', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        console.log(res);
        expect(res.body.token.length).to.be.above(0);
        done();
      });
  });

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
      .set('username', 'testAdmin')
      .set('password', 'foobar123')
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
