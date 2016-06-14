'use strict';

angular.module('informationDisplay')
  .component('informationDisplay', {
    templateUrl: 'app/components/information-display/information-display.template.html',
    bindings: { message: '<' },
    controller: function ($http, $scope, socket, Auth, NodeDataFactory) {
      $scope.node = NodeDataFactory.node;
      this.inputHidden = true;
      this.newInfo = '';
      var self = this;

      // toggle the visibility of the input text box
      this.onClick = function(){
        this.inputHidden = !this.inputHidden;
      }

      // update the node with the new info
      // ...
      // TODO: move this to the service
      // i'm planning to handle all api calls there
      $scope.updateNode = function() {
        //alert('manger manger');
        if (self.newInfo) {
          //alert('danger danger');
          $http.put('/api/nodes/' + $scope.node._id, {
            info: self.newInfo
          }).then(
            response => {
              self.newInfo = '';
              refreshNode();
            }
          );
        }
      }

      function refreshNode(){
        // Update the information display after
        // changing the value of the thing
        NodeDataFactory.setNode(
          $http.get('api/nodes/' + $scope.node._id)
            .then(
              // Success callback
              response => {
                $scope.node = response.data;
                NodeDataFactory.refreshNodes();
              },
              // Failure callback
              response => {
                alert('Failure failure');
              }
            )
        );
      }
    }
  }
);
