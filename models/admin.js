var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  basic: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

adminSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

adminSchema.methods.compareHash = function(password, callback) {
  bcrypt.compare(password, this.basic.password, callback);
};

adminSchema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('Admin', adminSchema);
