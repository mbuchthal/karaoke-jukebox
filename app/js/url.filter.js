require("../app.js");

angular.module("kvoxapp").filter("trustUrl", ["$sce", function($sce) {
    return function(trustUrl) {
      return $sce.trustAsResourceUrl(trustUrl);
    };
  }]);
