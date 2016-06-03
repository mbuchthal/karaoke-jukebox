'use strict';

var express = require('express');
var app = express();

app.use(express.static('mp3'));
var port = process.env.PORT || 5678;
app.listen(port, function() {
  console.log('mp3 server listening on ' + port + ' at ' + new Date().toString());
});
