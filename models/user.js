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
  },
  setExpiry: function(user) {
    var exp = Date.now() + 43200000; //exp after 12h
    this.usersDict[user.expiry] = exp;
  },
  checkExpired: function(user) {
    if (this.usersDict[user.expiry] < Date.now()) {
      return true;
    }
    return false;
  }
};
