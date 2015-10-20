var mongoose = require('mongoose');

var pendingUserSchema = new mongoose.Schema({
  token: String,
  expire: Date,
  username: String
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
