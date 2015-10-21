var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');

var adminRouter = module.exports = exports = express.Router();

adminRouter.post('/signinAdmin', jsonParser, function(req, res) {

});

adminRouter.post('/acceptUser:user', jsonParser, function(req, res) {
  User.findOne({user: req.params.user}, function(err, user) {
    if (err) {
      return handleError.internalServerError(err, res);
    }
    
  });
});

adminRouter.post('/declineUser:user', jsonParser, function(req, res) {
  User.findOne({user: req.params.user}, function(err, user) {
    if (err) {
      return handleError.internalServerError(err, res);
    }

  });
});

adminRouter.patch('/renameUser/:user', jsonParser, function(req, res) {
  User.findOne({user: req.params.user}, function(err, user) {
    if (err) {
      return handleError.notFoundError(err, res);
    }
  });
});

