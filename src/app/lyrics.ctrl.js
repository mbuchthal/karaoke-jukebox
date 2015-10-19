require("./app.js");
var mp3 = require("./yellowSubmarine.js");

(function() {

  "use strict";

  angular.module("test").controller("LyricsCtrl", function() {
    var vm = this;
  }).directive("renderedLyric", ["$interval", function($interval) {

    function link(scope, element, attrs) {
      var lyric = mp3.lyrics[0].text;
      var lineCounter = 0;
      var lyricArray = lyric.split("");
      // var renderArray, unrenderedArray;
      var renderArray = lyricArray.slice(0, 0);
      var unrenderArray = lyricArray.slice(0);
      var counter = 0;
      var beatDuration = mp3.lyrics[0].beat_duration;
      var beatIncrements = mp3.lyrics[0].beat_increments;
      var charCounter = 0;
      var timeoutId;

      // console.log(renderArray);
      // console.log(unrenderArray);

      scope.rendered = renderArray.join("");
      // scope.rendered = "test";
      scope.unrendered = unrenderArray.join("");

      function incrementCounters() {
        charCounter += beatIncrements[counter];
        counter++;
      }

      function resetCounters() {
        charCounter = 0;
        counter = 0;
      }

      function updateLyrics() {
        lyricArray = lyric.split("");
        renderArray = lyricArray.slice(0, charCounter);
        unrenderArray = lyricArray.slice(charCounter);
        scope.rendered = renderArray.join("");
        scope.unrendered = unrenderArray.join("");
      }

      function renderLyric() {
        element.append('<span class="rendered">' + scope.rendered + '</span><span class="unrendered">' + scope.unrendered + '</span>');
      }

      function clearLyric() {
        element.empty();
      }

      // scope.$watch("rendered", function() {
      //   updateLyric();
      // });
      renderLyric();

      timeoutId = $interval(function() {
        // scope.rendered = "hi";
        if (counter < beatIncrements.length) {
          incrementCounters();
          updateLyrics();
          clearLyric();
          renderLyric();
          console.log(scope.rendered);
        }
        if (counter === beatIncrements.length) {
          lineCounter++;
          if (lineCounter === mp3.lyrics.length) {
            $interval.cancel(timeoutId);
          }
          lyric = mp3.lyrics[lineCounter].text;
          beatIncrements = mp3.lyrics[lineCounter].beat_increments;
          beatDuration = mp3.lyrics[lineCounter].beat_duration;
          resetCounters();
          console.log(lyric, beatIncrements, beatDuration);
          updateLyrics();
          clearLyric();
          renderLyric();
        }
      }, beatDuration);
    }

    return {
      link: link
    };
  }]);

})();
