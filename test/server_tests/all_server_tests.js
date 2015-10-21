'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGO_URL = 'mongodb://localhost/karaoke_jukebox_test';

var server = require(__dirname + '/../../server.js');

var kjPORT = ':' + (process.env.PORT || 3000);
var kjURL = (process.env.KJURL || 'localhost') + kjPORT;

describe('the karaoke jukebox server', function() {
  it('should exist, with a database connection', function(done) {
    chai.request(kjURL)
    .get('/')
    .end(function(err, resp) {
      expect(err).to.eql(null);
      expect(typeof resp.body).to.eql('object');
      done();
    });
  });

  require(__dirname + '/socket_integration_tests');
  require(__dirname + '/lyrics_tests');
  require(__dirname + '/users_tests');
  require(__dirname + '/queue_routes_tests');
  require(__dirname + '/qr_code_tests');
  require(__dirname + '/admin_tests');

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) {return console.log(err);}
      server.shutDown();
      //Due to use of socketServer, these tests must be run after server teardown
      require(__dirname + '/socket_server_tests');
      done();
    });
  });
});
