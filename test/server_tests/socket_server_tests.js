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
      socket: function() {
        return clientSocket;
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
      close: function() {}
    };

    socket = new EventEmitter();
    SocketServer = require(__dirname + '/../../sockets/base');
    socketServer = new SocketServer(io);
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
    var user = {token: 12345};
    io.emit('connection', socket);
    socket.emit('registerUser', user);
  });

  it('should send queue updates to all registered users', function(done) {

    registerUser(io, socket, socketServer, {token: 12345, username: 'test'});
    var serverEvents = socketServer.getEmitter();
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('updateQueue', {queue: 'test'});

    socketServer.updateQueue({queue: 'test'});
    mock.verify();
    done();
  });

  it('should update connected user on acceptance', function(done) {
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('acceptUser',
        {user: {
          token: 12345,
          username: 'test'},
         token: 12345,
         queue: 'queue',
         songlist: 'songList'
        });
    registerUser(io, socket, socketServer, {token: 12345, username: 'test'},
        'queue', 'songList');
    mock.verify();
    done();
  });

  it('should disconnect unaccepted users', function(done) {
    io.emit('connection', socket);
    socket.emit('registerUser', {token: 12345});
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('declineUser');
    socketServer.declineConnection(12345);
    mock.verify();
    done();
  });

  it('should send onDeck request and accept response', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {token: 12345, id: 5},
        'queue', 'songlist');
    var mock = sinon.mock(clientSocket);
    mock.expects('emit').once().withExactArgs('onDeck');
    socketServer.onDeck({token: 12345, id: 5}, function() {
      mock.verify();
      done();
    });
    socket.emit('onDeck');
  });

  it('should report disconnections', function(done) {
    socket.id = '215';
    registerUser(io, socket, socketServer, {token: 12345, id: 5},
        'queue', 'songlist');
    var serverEvents = socketServer.getEmitter();
    serverEvents.on('disconnected', function(user) {
      expect(user.token).to.eql(12345);
      done();
    });
    socket.emit('disconnect');
  });
});

function registerUser(io, socket, socketServer, user, queue, songList) {
  io.emit('connection', socket);
  socket.emit('registerUser', user);
  socketServer.acceptUser(user.token, user, queue, songList);
}
