'use strict';

angular.module('nlsr-display')
  .component('nlsrDisplay', {
    templateUrl: 'app/components/nlsr-display/nlsr-display.template.html',
    bindings: { message: '<' },
    controller: function() {
      this.message = 'World'
    }
});
