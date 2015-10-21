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
    return this.queue.shift();
  },
  onDeck: function() {
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
    return true;
  },
  hasSong: function(user) {
    return !!this.queueByUser[user.id];
  },
  removeSong: function(user) {
    this.queue.splice(this.queueByUser[user.id].index, 1);
    this.queueByUser[user.id] = null;
  },
  changeSong: function(user, song) {
    this.queueByUser[user.id].song = song;
  }
};
