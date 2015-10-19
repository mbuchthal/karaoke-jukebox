'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGO_URL = 'mongodb://localhost/karaoke_jukebox_test';

var server = require(__dirname + '/../../server');
var lyricsURL = 'localhost:3000/api';

var Lyric = require(__dirname + '/../../models/lyric');

describe('the lyrics server', function() {
  after(function(done) {  // jshint ignore:line
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) {return console.log(err);}
      done();
    });
  });
  it('should exist', function() {
    expect(Lyric).not.to.eql(undefined);
    expect(Lyric).not.to.eql(null);
  });
  it('should have a database connection', function(done) {
    chai.request(lyricsURL)
    .get('/lyrics')
    .end(function(err, resp) {
      expect(err).to.eql(null);
      expect(Array.isArray(resp.body)).to.eql(true);
      done();
    });
  });
  it('should be able to write a lyric to the database', function(done) {
    chai.request(lyricsURL)
    .post('/lyrics')
    .send({
        title: '99BottlesOfBeer',
        author: 'Annoyamous',
        mp3file: 'ninety_nine_bottles.mp3',
        lyrics: [{text: 'Ninety-nine bottles of beer on the wall,',
                  beatDuration: 150,
                  beatIncrements: [4,2,5,4,4,3,5,3,4,6,0,0]},
                 {text: 'Ninety-nine bottles of beer,',
                  beatDuration: 150,
                  beatIncrements: [4,2,5,4,4,3,6,0,0,0,0]},
                 {text: 'You take one down and pass it around,',
                  beatDuration: 150,
                  beatIncrements: [3,5,0,4,5,0,4,5,3,2,6,0,0]},
                 {text: 'Ninety-eight bottles of beer on the wall.',
                  beatDuration: 150,
                  beatIncrements: [4,2,6,4,4,3,5,3,4,6,0,0]}
                ]
      })
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.status).to.eql(201); // Created
      expect(ret.body.title).to.eql('99BottlesOfBeer');
      expect(ret.body.author).to.eql('Annoyamous');
      expect(ret.body.mp3file).to.eql('ninety_nine_bottles.mp3');
      expect(ret.body.lyrics.length).to.eql(4);
      expect(ret.body.lyrics[0].beatDuration).to.eql(150);
      expect(ret.body.lyrics[0].text.length).to.eql(
        ret.body.lyrics[0].beatIncrements.reduce(function(acc, inc) {
          return acc += inc;
        }));
      done();
    });
  });
});
