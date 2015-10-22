require("../app.js");
require("./url.filter.js");
// var mp3 = require("./yellowSubmarine.js");

(function() {

  "use strict";

  angular.module("kvoxapp").controller("RendererCtrl", ["$interval",  function($interval) {
    var vm = this;
    var queue = {
      user: {
        id: "57394578394579",
        nick: "Bob"
      },
      song: {"_id":"5627e25560365c0300740b4d","title":"Yellow Submarine","genre":"Rock","mp3file":"yellowsubmarine-beatles.mp3","__v":0,"lyrics":[{"beatDuration":206,"text":"[8 hb silence]  [8 hb guitar strum]","_id":"5627ee9d30fdb80300d826b9","beatIncrements":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"beatDuration":206,"text":". . . In the town where I was born","_id":"5627ee9d30fdb80300d826b8","beatIncrements":[1,1,1,1,1,1,2,4,5,0,0,0,0,6,2,4,5,0,0,0,0,0]},{"beatDuration":206,"text":"lived a man who sailed the seas","_id":"5627ee9d30fdb80300d826b7","beatIncrements":[5,2,2,1,1,0,0,4,7,4,5,0,0,0,0,0]},{"beatDuration":206,"text":"And he told us of his life","_id":"5627ee9d30fdb80300d826b6","beatIncrements":[3,3,5,0,0,0,0,3,3,4,5,0,0,0,0,0]},{"beatDuration":206,"text":"in the land of submarines","_id":"5627ee9d30fdb80300d826b5","beatIncrements":[2,4,3,1,1,0,0,3,4,2,5,0,0,0,0,0]},{"beatDuration":206,"text":"So we sailed up to the sun","_id":"5627ee9d30fdb80300d826b4","beatIncrements":[2,3,7,0,0,0,0,3,3,4,4,0,0,0,0,0]},{"beatDuration":206,"text":"Til we found the sea of green","_id":"5627ee9d30fdb80300d826b3","beatIncrements":[3,3,3,1,2,0,0,4,4,3,6,0,0,0,0,0]},{"beatDuration":206,"text":"And we lived beneath the waves","_id":"5627ee9d30fdb80300d826b2","beatIncrements":[3,3,6,0,0,0,0,3,5,4,6,0,0,0,0,0]},{"beatDuration":206,"text":"In our Yellow Submarine","_id":"5627ee9d30fdb80300d826b1","beatIncrements":[2,4,3,1,3,0,0,0,4,2,4,0,0,0,0,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d826b0","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d826af","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d826ae","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d826ad","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0]},{"beatDuration":206,"text":"And our friends are all aboard","_id":"5627ee9d30fdb80300d826ac","beatIncrements":[3,4,8,0,0,0,0,4,4,3,4,0,0,0,0,0]},{"beatDuration":206,"text":"Many more of us live next door","_id":"5627ee9d30fdb80300d826ab","beatIncrements":[2,2,5,3,3,0,0,0,5,5,5,0,0,0,0,0]},{"beatDuration":206,"text":"And the band begins to play","_id":"5627ee9d30fdb80300d826aa","beatIncrements":[3,4,5,0,0,0,0,3,4,3,5,0,0,0,0,0]},{"beatDuration":206,"text":"[18 hb band instruments]","_id":"5627ee9d30fdb80300d826a9","beatIncrements":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d826a8","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d826a7","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d826a6","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d826a5","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"[62 hb instrumental break, voices in background ]","_id":"5627ee9d30fdb80300d826a4","beatIncrements":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"beatDuration":206,"text":"So we live a life of ease ","_id":"5627ee9d30fdb80300d826a3","beatIncrements":[2,3,5,0,0,0,0,2,5,3,5,0,0,0,0,0]},{"beatDuration":206,"text":"Every one of us has all we need","_id":"5627ee9d30fdb80300d826a2","beatIncrements":[2,3,4,3,3,0,0,4,4,3,5,0,0,0,0,0]},{"beatDuration":206,"text":"Sky of blue and sea of green","_id":"5627ee9d30fdb80300d826a1","beatIncrements":[3,3,5,0,0,0,0,4,4,3,6,0,0,0,0,0]},{"beatDuration":206,"text":"In our Yellow Submarine","_id":"5627ee9d30fdb80300d826a0","beatIncrements":[2,4,3,1,3,0,0,0,4,2,4,0,0,0,0,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d8269f","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d8269e","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d8269d","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d8269c","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d8269b","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d8269a","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"We all live in a Yellow Submarine","_id":"5627ee9d30fdb80300d82699","beatIncrements":[2,0,4,0,5,0,3,2,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"Yellow Submarine, Yellow Submarine","_id":"5627ee9d30fdb80300d82698","beatIncrements":[3,3,4,2,5,0,0,0,4,3,4,2,4,0,0,0]},{"beatDuration":206,"text":"","_id":"5627ee9d30fdb80300d82697","beatIncrements":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}],"author":"The Beatles"}
    };
    // var queue = socket.queue;
    var user = queue.user;
    var song = queue.song;
    var audio = document.getElementById("player");
    var mp3Path = "http://localhost:5678/"

    function renderSong() {
      var lyricArray, renderedArray, unrenderedArray;
      var currentLyric = song.lyrics[0].text;
      var beatDuration = song.lyrics[0].beatDuration;
      var beatIncrements = song.lyrics[0].beatIncrements;
      var lineCounter = 0;
      var beatCounter = 0;
      var charCounter = 0;
      var timeoutId;

      function incrementBeatCounters() {
        charCounter += beatIncrements[beatCounter];
        beatCounter++;
      }

      function resetBeatCounters() {
        charCounter = 0;
        beatCounter = 0;
      }

      function resetSong() {
        lineCounter = 0;
        resetBeatCounters();
        vm.renderedCurrentLyric = "";
        vm.unrenderedCurrentLyric = "";
        vm.nextLyric = "";
      }

      function updateLyrics() {
        lyricArray = currentLyric.split("");
        renderedArray = lyricArray.slice(0, charCounter);
        unrenderedArray = lyricArray.slice(charCounter);
        vm.renderedCurrentLyric = renderedArray.join("");
        vm.unrenderedCurrentLyric = unrenderedArray.join("");
      }

      vm.nextLyric = song.lyrics[1].text;

      // Render initial conditions to screen
      updateLyrics();

      timeoutId = $interval(function() {
        // Deactivate timer interval after last lyric has rendered
        if (lineCounter === song.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          $interval.cancel(timeoutId);
        }
        // On each beat, update counters
        if (beatCounter < beatIncrements.length) {
          incrementBeatCounters();
          // console.log(vm.renderedCurrentLyric);
        }
        // Retrieve next line when current lyric has finished and reset counters
        if (lineCounter < song.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          lineCounter++;
          currentLyric = song.lyrics[lineCounter].text;
          if (lineCounter < song.lyrics.length - 1) {
            vm.nextLyric = song.lyrics[lineCounter + 1].text;
          } else {
            vm.nextLyric = "";
          }
          beatIncrements = song.lyrics[lineCounter].beatIncrements;
          beatDuration = song.lyrics[lineCounter].beatDuration;
          resetBeatCounters();
          // console.log(currentLyric, vm.nextLyric, beatIncrements, beatDuration);
        }
        // Update lyrics and render to screen
        updateLyrics();
      }, beatDuration);

      audio.addEventListener("pause", function() {
        console.log("paused");
        $interval.cancel(timeoutId);
        audio.currentTime = 0;
        resetSong();
      });
    }

    audio.addEventListener("play", function() {
      renderSong();
    });

    vm.username = user.nick;
    vm.songTitle = song.title;
    vm.songSrc = mp3Path + song.mp3file;
    // console.log(vm.songSrc);

    // renderSong();

  }]);

})();
