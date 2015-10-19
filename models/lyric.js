var mongoose = require('mongoose');

var lyricSchema = new mongoose.Schema({
  title:  {type: String, required: true},
  author: {type: String, default: 'Anonymous'},
  mp3file: {type:  String, required: true, unique: true},
  lyrics: [{text: String,
            beatDuration: Number,
            beatIncrements: [Number]
          }]
});

var Lyric = module.exports = exports = mongoose.model('Lyric', lyricSchema);
