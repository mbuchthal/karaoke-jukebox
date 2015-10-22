require("../app.js");
var mp3 = require("./yellowSubmarine.js");

(function() {

  "use strict";

  angular.module("kvoxapp").controller("RendererCtrl", ["$interval", function($interval) {
    var vm = this;

    function renderSong() {
      var lyricArray, renderedArray, unrenderedArray;
      var currentLyric = mp3.lyrics[0].text;
      var beatDuration = mp3.lyrics[0].beat_duration;
      var beatIncrements = mp3.lyrics[0].beat_increments;
      var lineCounter = 0;
      var beatCounter = 0;
      var charCounter = 0;
      var timeoutId;

      function incrementCounters() {
        charCounter += beatIncrements[beatCounter];
        beatCounter++;
      }

      function resetCounters() {
        charCounter = 0;
        beatCounter = 0;
      }

      function updateLyrics() {
        lyricArray = currentLyric.split("");
        renderedArray = lyricArray.slice(0, charCounter);
        unrenderedArray = lyricArray.slice(charCounter);
        vm.renderedCurrentLyric = renderedArray.join("");
        vm.unrenderedCurrentLyric = unrenderedArray.join("");
      }

      vm.nextLyric = mp3.lyrics[1].text;

      // Render initial conditions to screen
      updateLyrics();

      timeoutId = $interval(function() {
        // Deactivate timer interval after last lyric has rendered
        if (lineCounter === mp3.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          $interval.cancel(timeoutId);
        }
        // On each beat, update counters
        if (beatCounter < beatIncrements.length) {
          incrementCounters();
          console.log(vm.renderedCurrentLyric);
        }
        // Retrieve next line when current lyric has finished and reset counters
        if (lineCounter < mp3.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          lineCounter++;
          currentLyric = mp3.lyrics[lineCounter].text;
          if (lineCounter < mp3.lyrics.length - 1) {
            vm.nextLyric = mp3.lyrics[lineCounter + 1].text;
          } else {
            vm.nextLyric = "";
          }
          beatIncrements = mp3.lyrics[lineCounter].beat_increments;
          beatDuration = mp3.lyrics[lineCounter].beat_duration;
          resetCounters();
          console.log(currentLyric, vm.nextLyric, beatIncrements, beatDuration);
        }
        // Update lyrics and render to screen
        updateLyrics();
      }, beatDuration);
    }

    vm.username = "Bob";
    vm.song = "Yellow Submarine";

    renderSong();

  }]);

})();
