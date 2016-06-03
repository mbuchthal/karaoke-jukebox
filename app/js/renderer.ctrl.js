require("../app.js");
require("./url.filter.js");

(function () {

  "use strict";

  angular.module("kvoxapp").controller("RendererCtrl", ["$interval", "$http", "$log", "$q", "socket", function($interval, $http, $log, $q, socket) {
    var vm = this;
    var user, song, currentLyric, timeoutId, beatDuration, beatIncrements, lineCounter, beatCounter, charCounter;
    var audio = document.getElementById("player");
    var mp3Path = 'https://kvox-server.herokuapp.com/';

    function initialize() {
      user = socket.queue[0].user;
      song = socket.queue[0].song;
      vm.songSrc = mp3Path + song.mp3file;
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
      vm.highlightedLyric = "";
      vm.plainLyric = "";
      vm.nextLyric = "";
    }

    function updateLyrics() {
      vm.highlightedLyric = currentLyric.slice(0, charCounter);
      vm.plainLyric = currentLyric.slice(charCounter);
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
