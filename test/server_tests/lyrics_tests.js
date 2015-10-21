'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');

var lyricsURL = 'localhost:3000/api';

var Lyric = require(__dirname + '/../../models/lyric');

var testSong = {
        title: '99BottlesOfBeer',
        author: 'Anonymous',
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
                ]};

describe('the lyrics server', function() {
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
    .send(testSong)
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.status).to.eql(201); // Created
      Lyric.find(testSong, function(err, data) {
        expect(err).to.eql(null);
        done();
      });
    });
  });
  it('should return all songs', function(done) {
    chai.request(lyricsURL)
    .get('/lyrics')
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.body.length).to.be.at.least(1);
      done();
    });
  });
  it('should return a file based on id', function(done) {
    chai.request(lyricsURL)
    .get('/lyrics/' + testSong.mp3file)
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.body.title).to.eql('99BottlesOfBeer');
      done();
    });
  });
  it('should update song data', function(done) {
    testSong.title = '98BottlesOfBeer';
    chai.request(lyricsURL)
    .put('/lyrics/' + testSong.mp3file)
    .send(testSong)
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.status).to.eql(200);
      Lyric.findOne({title: testSong.title}, function(err, data) {
        expect(err).to.eql(null);
        expect(data).to.not.eql(null);
        done();
      });
    });
  });
  it('should delete song data', function(done) {
    chai.request(lyricsURL)
    .delete('/lyrics/' + testSong.mp3file)
    .end(function(err, ret) {
      expect(err).to.eql(null);
      expect(ret.status).to.eql(200);
      Lyric.findOne({title: testSong.title}, function(err, data) {
        expect(err).to.eql(null);
        expect(data).to.eql(null);
        done();
      });
    });
  });
});
