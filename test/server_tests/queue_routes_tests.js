var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var queue = require(__dirname + '/../../models/queue');
var users = require(__dirname + '/../../models/user');

var serverURL = 'http://localhost:3000';

describe('queues', function() {
  before(function() {
    users.add({id: '12345', nick: 'bon'});
    users.add({id: '67890', nick: 'obo'});
  });

  it('should accept new queued songs', function(done) {
    chai.request(serverURL)
    .post('/api/queue')
    .set('id', '12345')
    .set('nick', 'bon')
    .send({song: {mp3info: 'ninety_nine_bottle.mp3'}})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue[0].song.mp3info).to.eql('ninety_nine_bottle.mp3');
      done();
    });
  });

  it('should allow queue reordering', function(done) {
    queue.add({mp3info: 'ninety_seven_bottle.mp3'}, {id: '67890', nick: 'obo'});
    chai.request(serverURL)
    .patch('/api/queue')
    .set('id', '12345')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue[0].user.id).to.eql('67890');
      done();
    });
  });

  it('should allow changing songs', function(done) {
    chai.request(serverURL)
    .patch('/api/queue')
    .set('id', '67890')
    .send({song: {mp3info: 'ninety_eight_bottle.mp3'}})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue[0].song.mp3info).to.eql('ninety_eight_bottle.mp3');
      done();
    });
  });

  it('should allow removing songs', function(done) {
    chai.request(serverURL)
    .delete('/api/queue')
    .set('id', '12345')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue.length).to.eql(1);
      expect(queue.queue[0].user.id).to.eql('67890');
      done();
    });
  });

});
