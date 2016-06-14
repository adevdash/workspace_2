'use strict';

angular.module('faults')
  .component('faults', {
    templateUrl: 'app/components/faults/faults.template.html',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'Warld'
    }
});
