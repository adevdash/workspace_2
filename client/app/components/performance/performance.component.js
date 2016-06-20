'use strict';

angular.module('performance')
  .component('performance', {
    templateUrl: 'app/components/performance/performance.template.html',
    bindings: { message: '<' },
    controller: function($scope) {
      this.message = 'World'

      $scope.graph = {'width': 600, 'height': 450};
      $scope.points = [
        {'x': 3,  'y': 7 },
        {'x': 5,  'y': 15},
        {'x': 7,  'y': 8 },
        {'x': 11, 'y': 17},
        {'x': 13, 'y': 13},
        {'x': 17, 'y': 23}
      ];

      var x = d3.time.scale().range([0, $scope.graph.width]);
      var y = d3.scale.linear().range([$scope.graph.height, 0]);

      x.domain(d3.extent($scope.points, function(d) {return d.x}));
      y.domain(d3.extent($scope.points, function(d) {return d.y}));

      $scope.line = d3.svg.line()
        .x(function(d) {return x(d.x);})
        .y(function(d) {return y(d.y);});
    }
});
