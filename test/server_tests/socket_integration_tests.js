describe('socket server integration', function() {
  var io = require('socket.io-client');
  var socketURL = 'http://localhost:3000';
  var socketOptions = {
    transports: ['websocket'],
    'force new connection': true
  };
  var socket;

  beforeEach(function(done) {
    this.timeout = 5000;
    socket = io.connect(socketURL, socketOptions);
    socket.on('connect', function() {
      console.log('connected');
      done();
    });
  });

  it('should integrate with express', function(done) {
    socket.on('pong', function() {
      done();
    });
    socket.emit('ping');
  });

  afterEach(function(done) {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

});

