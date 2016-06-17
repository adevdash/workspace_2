'use strict';

angular.module('informationDisplay')
  .component('informationDisplay', {
    templateUrl: 'app/components/information-display/information-display.template.html',
    bindings: { message: '<' },
    controller: function ($http, $scope, socket, Auth, NodeDataFactory) {
      $scope.node = NodeDataFactory.node;
      $scope.nodes = NodeDataFactory.node_list;
      this.inputHidden = true;
      this.newInfo = '';
      var self = this;

      // toggle the visibility of the input text box
      this.onClick = function(){
        this.inputHidden = !this.inputHidden;
      }


      this.updateNode = function(){
        if(this.newInfo && !$scope.node.content.hasOwnProperty('karmaPolice')) {
          console.log(this.newInfo);
          NodeDataFactory.updateNodeInfo(this.newInfo, (response)=> {
          });
          this.newInfo = '';
        }
      }
    }
  }
);
