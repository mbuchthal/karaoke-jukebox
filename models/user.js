module.exports = exports = {
  usersDict: {},
  add: function(user) {
    this.usersDict[user.id] = user;
  },
  remove: function(user) {
    this.usersDict[user.id] = null;
  },
  exists: function(id) {
    return !!this.usersDict[id];
  },
  getUser: function(id) {
    return this.usersDict[id];
  },
  changeNick: function(id, nick) {
    this.usersDict[id].nick = nick;
  }
};
