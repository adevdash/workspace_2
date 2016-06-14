'use strict';

angular.module('workspace2App.auth', ['workspace2App.constants', 'workspace2App.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
