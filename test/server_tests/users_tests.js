var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var users = require(__dirname + '/../../lib/user');
var serverURL = 'http://localhost:3000';

describe('users', function() {
  it('should accept existing users', function(done) {
    chai.request(serverURL)
    .get('/api/user')
    .set('id', '12345')
    .set('nick', 'guestperson')
    .end(function(err, res) {
      expect(res.status).to.eql(202);
      expect(err).to.eql(null);
      expect(users.exists('12345')).to.eql(true);
      done();
    });
  });

  it('should accept new users', function(done) {
    chai.request(serverURL)
    .get('/api/user')
    .end(function(err, res) {
      expect(res.status).to.eql(202);
      expect(err).to.eql(null);
      expect(users.getUser(res.body.id)).to.not.eql(null);
      done();
    });
  });

  it('should change user nicknames', function(done) {
    chai.request(serverURL)
    .patch('/api/user')
    .set('id', '12345')
    .set('nick', 'oldnick')
    .send({nick: 'newnick'})
    .end(function(err, res) {
      expect(res.status).to.eql(200);
      expect(err).to.eql(null);
      expect(users.getUser('12345').nick).to.eql('newnick');
      done();
    });
  });
});
