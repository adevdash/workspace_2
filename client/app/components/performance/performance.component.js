'use strict';

angular.module('performance')
  .component('performance', {
    templateUrl: 'app/components/performance/performance.template.html',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'World'
    }
});
