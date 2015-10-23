require("../app.js");
require("./url.filter.js");

(function() {

  "use strict";

  angular.module("kvoxapp").controller("RendererCtrl", ["$interval", "$http", "$log", "$q", "socket", function($interval, $http, $log, $q, socket) {
    var vm = this;
//     var queue = {
//       user: {
//         id: "57394578394579",
//         nick: "Bob"
//       },
//       song: {"title":"Rainbow Connection","author":"Kermit the Frog","mp3file":"rainbowconnection-kermitthefrog.mp3","genre":"Musical",
// "lyrics":[
// {"text":"•  •  • • • •","beatDuration":"264","beatIncrements":[
//     0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0,
// 1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0,
// 1,0,0,1,0,0, 1,0,0,1,0,0, 1,0,0,1,0,0, 1,0,0,1,0,0]},
// {"text":"Why are there so many","beatDuration":"264","beatIncrements":[
// 3,0,4,0,0,6,3,3,2,0,0,0]},
// {"text":"songs about rainbows","beatDuration":"264","beatIncrements":[
// 5,0,0,3,3,0,5,0,4,0,0]},
// {"text":"and what's on the other side?","beatDuration":"264","beatIncrements":[
// 3,7,0,3,0,4,0,2,1,1,1,1,0,6,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Rainbows are visions","beatDuration":"264","beatIncrements":[
// 4,0,4,0,0,4,4,0,5,0,0]},
// {"text":"but only illusions","beatDuration":"264","beatIncrements":[
// 3,3,0,2,0,0,4,1,0,5,0,0]},
// {"text":"and rainbows have nothing to hide","beatDuration":"264","beatIncrements":[
// 3,5,0,4,0,5,0,3,5,0,0,0,3,5,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"So we've been told","beatDuration":"264","beatIncrements":[
// 2,0,6,0,5,0,5,0]},
// {"text":"and some choose to believe it","beatDuration":"264","beatIncrements":[
// 3,0,5,0,7,0,3,0,3,0,5,3,0,0,0,0]},
// {"text":"I know they're wrong","beatDuration":"264","beatIncrements":[
// 1,0,5,0,8,6,0,0]},
// {"text":"wait and see","beatDuration":"264","beatIncrements":[
// 4,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Someday we'll find it","beatDuration":"264","beatIncrements":[
// 4,0,3,0,0,6,5,0,3,0,0]},
// {"text":"the Rainbow Connection","beatDuration":"264","beatIncrements":[
// 3,5,0,3,0,0,4,3,0,4,0,0]},
// {"text":"the lovers, the dreamers, and me","beatDuration":"264","beatIncrements":[
// 3,3,5,0,0,0,4,6,4,0,0,4,0,3,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"• • • • • •","beatDuration":"264","beatIncrements":[
// 1,1,1,1,1,1,1,1,1,1,1,0]},
// {"text":"Who said that every wish","beatDuration":"264","beatIncrements":[
// 3,0,5,0,0,5,3,3,5,0,0]},
// {"text":"would be heard and answered","beatDuration":"264","beatIncrements":[
// 5,3,0,6,0,0,4,4,0,6,0,0]},
// {"text":"when wished on the morning star?","beatDuration":"264","beatIncrements":[
// 4,7,0,3,0,4,0,5,0,0,0,3,0,6,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Somebody thought of that","beatDuration":"264","beatIncrements":[
// 4,2,2,0,0,0,8,3,5,0,0]},
// {"text":"and someone believed it","beatDuration":"264","beatIncrements":[
// 3,5,0,3,0,0,3,6,0,3,0,0,0]},
// {"text":"Look what it's done so far","beatDuration":"264","beatIncrements":[
// 4,0,5,0,5,0,5,0,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"What's so amazing","beatDuration":"264","beatIncrements":[
// 6,0,3,0,3,0,1,0,5,0]},
// {"text":"that keeps us stargazing","beatDuration":"264","beatIncrements":[
// 4,0,6,0,3,0,5,0,3,0,3,0,0]},
// {"text":"and what do we think we might see?","beatDuration":"264","beatIncrements":[
// 3,5,0,3,0,3,0,6,0,0,3,6,0,5,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Someday we'll find it","beatDuration":"264","beatIncrements":[
// 4,0,3,0,0,6,5,0,3,0,0]},
// {"text":"the Rainbow Connection","beatDuration":"264","beatIncrements":[
// 3,5,0,3,0,0,4,3,0,4,0,0]},
// {"text":"the lovers, the dreamers, and me","beatDuration":"264","beatIncrements":[
// 3,3,5,0,0,0,4,6,4,0,0,4,0,3,0,0,0,0,0]},
// {"text":"All of us under its spell","beatDuration":"264","beatIncrements":[
// 3,0,0,3,3,0,3,0,0,3,4,0,6,0,0,0]},
// {"text":"We know that it's probably magic...","beatDuration":"264","beatIncrements":[
// 2,0,5,0,0,5,5,0,5,0,2,0,2,0,4,0,0,0,0,0,2,0,0,0,0,0,1,0,1,0,1,0]},
// {"text":"Have you been half-asleep","beatDuration":"264","beatIncrements":[
// 4,0,4,0,5,0,5,3,4,0,0]},
// {"text":"and have you heard voices?","beatDuration":"264","beatIncrements":[
// 3,5,0,4,0,6,0,4,0,4,0,0,0]},
// {"text":"I've heard them calling my name","beatDuration":"264","beatIncrements":[
// 4,0,6,0,5,0,5,0,3,0,3,0,5,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Is this the sweet sound","beatDuration":"264","beatIncrements":[
// 2,0,5,0,0,4,6,0,6,0,0,0,0]},
// {"text":"that called the young sailors?","beatDuration":"264","beatIncrements":[
// 4,7,0,0,4,6,0,5,0,4,0,0]},
// {"text":"The voice might be one and the same","beatDuration":"264","beatIncrements":[
// 3,6,0,6,0,3,0,4,4,0,0,4,0,5,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"I've heard it","beatDuration":"264","beatIncrements":[
// 4,0,6,0,3,0]},
// {"text":"too many times to ignore it","beatDuration":"264","beatIncrements":[
// 3,0,3,0,2,0,6,0,3,0,3,0,4,3,0,0,0]},
// {"text":"it's something that I'm s'posed to be","beatDuration":"264","beatIncrements":[
// 4,5,0,5,0,0,5,4,0,8,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0]},
// {"text":"Someday we'll find it","beatDuration":"264","beatIncrements":[
// 4,0,3,0,6,0,5,0,3,0,0]},
// {"text":"the Rainbow Connection","beatDuration":"264","beatIncrements":[
// 3,5,0,4,0,0,3,3,0,4,0,0]},
// {"text":"the lovers, the dreamers, and me","beatDuration":"264","beatIncrements":[
// 3,4,4,0,0,0,4,6,4,0,0,4,0,3,0,0,0,0,0]},
// {"text":"Laa da daa dee da daa dum","beatDuration":"264","beatIncrements":[
// 3,0,0,3,4,0,4,0,0,3,4,0,4,0,0,0]},
// {"text":"Laa daa da daa daa de daa ooo","beatDuration":"264","beatIncrements":[
// 3,0,4,0,0,3,4,0,4,0,3,0,4,0,4,0,0,0,0,0,0,0,0,0,0,0]}]}
//     };
    // var username = queue.user;
    // var song = queue.song;
    var user, song, lyricArray, renderedArray, unrenderedArray, currentLyric, timeoutId, beatDuration, beatIncrements, lineCounter, beatCounter, charCounter;
    var audio = document.getElementById("player");
    var mp3Path = "http://localhost:5678/"

    function initialize() {
      console.log(socket.queue[0]);
      user = socket.queue[0].user;
      song = socket.queue[0].song;
      vm.songSrc = mp3Path + song.mp3file;
      console.log(socket.queue);
      userMessage(",", " you're up!");
      beatDuration = song.lyrics[0].beatDuration;
      beatIncrements = song.lyrics[0].beatIncrements;
      lineCounter = 0;
      resetBeatCounters();
    }

    function updateQueue() {
      return $http.delete("/api/queue", {
        headers: {"user": user}
      }).then(sucessHandler, errorHandler);
    }

    function successHandler(resp) {
      $log.info("Deleted", resp);
    }

    function errorHandler(resp) {
      $log.error("Could not delete " + resp);
    }

    function userMessage(punc, msg, title) {
      vm.username = user.nick + punc;
      vm.message = msg;
      vm.songTitle = title;
    }

    function incrementBeatCounters() {
      charCounter += beatIncrements[beatCounter];
      beatCounter++;
    }

    function resetBeatCounters() {
      beatCounter = 0;
      charCounter = 0;
    }

    function resetSong() {
      initialize();
      currentLyric = song.lyrics[0].text;
      vm.nextLyric = song.lyrics[1].text;
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

    function renderSong() {
      // Render initial lyrics to screen
      userMessage("", " is singing ", '"' + song.title + '"');
      currentLyric = song.lyrics[0].text;
      vm.nextLyric = song.lyrics[1].text;
      updateLyrics();

      timeoutId = $interval(function() {
        // Deactivate timer interval after last lyric has rendered
        if (lineCounter === song.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          $interval.cancel(timeoutId);
        }
        // On each beat, update counters
        if (beatCounter < beatIncrements.length) {
          incrementBeatCounters();
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
        }
        // Update lyrics and render to screen
        updateLyrics();
      }, beatDuration);
    }

    initialize();

    audio.addEventListener("play", function() {
      renderSong();
    });

    audio.addEventListener("pause", function() {
      $interval.cancel(timeoutId);
      audio.currentTime = 0;
      resetSong();
    });

    audio.addEventListener("ended", function() {
      resetSong();
    });

  }]);

})();
