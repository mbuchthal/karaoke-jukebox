var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var EventEmitter = require('events');

describe('socket server', function() {
  var io;
  var socket;
  var sockerServer;
  var clientSocket;

  beforeEach(function() {
    io = new EventEmitter();
    io.sockets = {
      emit: function() {},
      connected: {
        '215': clientSocket
      },
      to: function() {
        return clientSocket;
      }
    };
    io.to = function() {
      return clientSocket;
    };
    clientSocket = {
      join: function(id) {},
      emit: function(eventName, eventData) {},
      disconnect: function() {}
    };

    socket = new EventEmitter();
    socketServer = require(__dirname + '/../../sockets/base')(io, true);
  });

  it('should respond to events', function(done) {
    var mock = sinon.mock(io.sockets);
    mock.expects('emit').once().withExactArgs('pong');
    io.emit('connection', socket);
    socket.emit('ping');
    mock.verify();
    done();
  });

  it('should accept and emit on user registration', function(done) {
    var serverEvents = socketServer.getEmitter();
    serverEvents.on('registerUser', function(token) {
      expect(token).to.eql(user.token);
      done();
    });
    var user = {id: 12345};
    io.emit('connection', socket);
    socket.emit('registerUser', {user: user});
  });

  it('should send queue updates to all registered users', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {id: 12345, nick: 'test'});
    var serverEvents = socketServer.getEmitter();
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('updateQueue', {queue: 'test'});
    socketServer.updateQueue({queue: 'test'});
    mock.verify();
    done();
  });

  it('should send user updates to that user', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {id: 23456, nick: 'test'});
    var serverEvents = socketServer.getEmitter();
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('updateUser',
        {user: {id: 23456, nick: 'test', socketID: '215'}});
    socketServer.updateUser({id: 23456, nick: 'test', socketID: '215'});
    mock.verify();
    done();
  });

  it('should update connected user on acceptance', function(done) {
    var mock = sinon.mock(clientSocket);
    socket.id = '215';
    mock.expects('emit').once().withExactArgs('acceptUser',
        {user: {
          id: 12345,
          socketID: '215',
          nick: 'test'},
         queue: 'queue',
         songlist: 'songList',
        });
    registerUser(io, socket, socketServer, {id: 12345, nick: 'test'},
        'queue', 'songList');
    mock.verify();
    done();
  });

  it('should disconnect unaccepted users', function(done) {
    socket.id = '215';
    var mock = sinon.mock(clientSocket);
    registerUser(io, socket, socketServer, {id: 12345, nick: 'test',
        socketID: '215'}, 'queue', 'songList');
    mock.expects('emit').once().withExactArgs('disconnectUser');
    socketServer.disconnectUser({id: 12345});
    mock.verify();
    done();
  });

  it('should send onDeck request and accept response', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {id: 56789, nick: 'tom'},
        'queue', 'songlist');
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('onDeck');
    socketServer.onDeck({id: 56789, nick: 'tom'}, function() {
      mock.verify();
      done();
    });
    socket.emit('onDeck');
  });

  it('should report disconnections', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {id: 12345, nick: 'harry'},
        'queue', 'songlist');
    var serverEvents = socketServer.getEmitter();
    serverEvents.on('disconnected', function(user) {
      expect(user.id).to.eql(12345);
      done();
    });
    socket.emit('disconnect');
  });

});

function registerUser(io, socket, socketServer, user, queue, songList) {
  io.emit('connection', socket);
  socket.emit('registerUser', user);
  socketServer.acceptUser(user, queue, songList);
}
