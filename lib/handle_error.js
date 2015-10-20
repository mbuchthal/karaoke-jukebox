'use strict';

var kjLog = require(__dirname + '/../lib/logger');

exports.internalServerError = function(err, resp) {
  kjLog(err);
  sendError(500, 'Internal Server Error', resp);
};

exports.notFoundError = function(err, resp) {
  kjLog(err);
  sendError(404, 'Document Not Found', resp);
};

exports.badRequest = function(msg, resp) {
  sendError(400, msg, resp);
};

exports.forbidden = function(msg, resp) {
  sendError(403, msg, resp);
};

function sendError(status, msg, resp) {
  resp.status(status).json(msg);
}
