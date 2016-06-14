angular.module('workspace2App', [
  'workspace2App.auth',
  'workspace2App.admin',
  'workspace2App.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'informationDisplay',
  'graph',
  'NodeDataFactory'//,
  //'accordionDemo'
]).config(
  function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
