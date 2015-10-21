var socketServer = require(__dirname + '/../sockets/base');

module.exports = exports = {
  queue: [],
  queueByUser: {},
  add: function(song, user) {
    var queueSong = {song: song, user: user};
    queueSong.index = this.queue.push(queueSong) - 1;
    this.queueByUser[user.id] = queueSong;
  },
  nextSong: function() {
    this.queueByUser[this.queue[0].user.id] = null;
    if (this.queue.length >= 3) {
      socketServer.onDeck(this.queue[2].user, function(onDeck) {
        if (!onDeck) {
          this.removeSong(this.queue[2].user);
        }
      });
    }
    return this.queue.shift();
  },
  onDeck: function() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue[0].user;
  },
  reOrder: function(user) {
    var index = this.queueByUser[user.id].index;
    if (index === this.queue.length - 1) {
      return false;
    }
    var temp = this.queue[index];
    temp.index = index + 1;
    this.queue[index] = this.queue[index + 1];
    this.queue[index].index = index;
    this.queue[index + 1] = temp;
    if (this.queue.length >= 3) {
      socketServer.onDeck(this.queue[2].user, function(onDeck) {
        if (!onDeck) {
          this.removeSong(this.queue[2].user);
        }
      });
    }
    return true;
  },
  hasSong: function(user) {
    return !!this.queueByUser[user.id];
  },
  removeSong: function(user) {
    this.queue.splice(this.queueByUser[user.id].index, 1);
    if (this.queue.length >= 3) {
      socketServer.onDeck(this.queue[2].user, function(onDeck) {
        if (!onDeck) {
          this.removeSong(this.queue[2].user);
        }
      });
    }
    this.queueByUser[user.id] = null;
  },
  changeSong: function(user, song) {
    this.queueByUser[user.id].song = song;
  }
};
