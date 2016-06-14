'use strict';

angular.module('performance', [])
  .component('performance', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'World'
    }
});
