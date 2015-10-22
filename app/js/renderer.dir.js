require("../app.js");

(function() {

  "use strict";

  angular.module("kvoxapp").directive("rendererDir", ["$interval", function($interval) {

    function link(scope, element) {
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
        scope.renderedCurrentLyric = renderedArray.join("");
        scope.unrenderedCurrentLyric = unrenderedArray.join("");
      }

      function renderCurrentLyric() {
        element.append('<li><span class="rendered">' + scope.renderedCurrentLyric + '</span><span class="unrendered">' + scope.unrenderedCurrentLyric + '</span></li>');
      }

      function renderNextLyric() {
        element.append('<li class="unrendered">' + scope.nextLyric + '</li>');
      }

      function clearRenderedLyrics() {
        element.empty();
      }

      // scope.$watch("rendered", function() {
      //   updateLyric();
      // });

      scope.nextLyric = mp3.lyrics[1].text;

      // Render initial conditions to screen
      updateLyrics();
      renderCurrentLyric();
      renderNextLyric();

      timeoutId = $interval(function() {
        // Deactivate timer interval after last lyric has rendered
        if (lineCounter === mp3.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          $interval.cancel(timeoutId);
        }
        // On each beat, update counters
        if (beatCounter < beatIncrements.length) {
          incrementCounters();
          console.log(scope.renderedCurrentLyric);
        }
        // Retrieve next line when current lyric has finished and reset counters
        if (lineCounter < mp3.lyrics.length - 1 && beatCounter === beatIncrements.length) {
          lineCounter++;
          currentLyric = mp3.lyrics[lineCounter].text;
          if (lineCounter < mp3.lyrics.length - 1) {
            scope.nextLyric = mp3.lyrics[lineCounter + 1].text;
          } else {
            scope.nextLyric = "";
          }
          beatIncrements = mp3.lyrics[lineCounter].beat_increments;
          beatDuration = mp3.lyrics[lineCounter].beat_duration;
          resetCounters();
          console.log(currentLyric, scope.nextLyric, beatIncrements, beatDuration);
        }
        // Update lyrics and render to screen
        updateLyrics();
        clearRenderedLyrics();
        renderCurrentLyric();
        renderNextLyric();
      }, beatDuration);
    }

    return {
      link: link
    };
  }]);

})();

