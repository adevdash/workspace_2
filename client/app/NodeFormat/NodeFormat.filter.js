'use strict';

angular.module('NodeFormat', [])
  .filter('NodeFormat', function () {
    return function (input) {
      return 'NodeFormat filter: ' + input;
    };
  });
