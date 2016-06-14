'use strict';

angular.module('faults', [])
  .component('faults', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'Warld'
    }
});
