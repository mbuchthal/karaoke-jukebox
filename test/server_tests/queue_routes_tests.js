var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var Lyric = require(__dirname + '/../../models/lyric');
var queue = require(__dirname + '/../../models/queue');
var users = require(__dirname + '/../../models/user');

var serverURL = 'http://localhost:3000';

describe('queues', function() {
  before(function(done) {
    users.add({id: '12345', nick: 'bon'});
    users.add({id: '67890', nick: 'obo'});
    var newLyric = new Lyric();
    var newLyric2 = new Lyric();
    var newLyric3 = new Lyric();
    newLyric.title = newLyric2.title = newLyric3.title = '99Bottles';
    newLyric.author = newLyric2.author = newLyric3.author = 'Anon';
    newLyric.mp3file = 'ninety_nine_bottle.mp3';
    newLyric2.mp3file = 'ninety_eight_bottle.mp3';
    newLyric3.mp3file = 'ninety_seven_bottle.mp3';
    newLyric.lyrics = newLyric2.lyrics = newLyric3.lyrics = '';
    newLyric.save(function(err, res) {
      newLyric2.save(function(err, res) {
        newLyric3.save(function(err, res) {
          done();
        });
      });
    });
  });

  it('should accept new queued songs', function(done) {
    chai.request(serverURL)
    .post('/api/queue')
    .set('id', '12345')
    .set('nick', 'bon')
    .send({song: {mp3file: 'ninety_nine_bottle.mp3'}})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue[0].song.mp3file).to.eql('ninety_nine_bottle.mp3');
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
    .send({song: {mp3file: 'ninety_eight_bottle.mp3'}})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(queue.queue[0].song.mp3file).to.eql('ninety_eight_bottle.mp3');
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
