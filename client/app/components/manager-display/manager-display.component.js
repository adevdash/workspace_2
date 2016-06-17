'use strict';

angular.module('manager-display')
  .component('managerDisplay', {
    templateUrl: 'app/components/manager-display/manager-display.template.html',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'World'
    }
});
