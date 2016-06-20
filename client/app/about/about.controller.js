'use strict';
(function(){

class AboutComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('workspace2App')
  .component('about', {
    templateUrl: 'app/about/about.html',
    controller: AboutComponent
  });

})();
