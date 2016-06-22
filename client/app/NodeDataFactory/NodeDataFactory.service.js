'use strict';

/*
* It's probably bad practice, but I'm going to have this
* service handling most of the data management, probably.
*
*
 */
angular.module('NodeDataFactory', ['NodeFilterModule', 'NodeFormat', 'GraphingService'])
  .factory('NodeDataFactory', function ($http, socket, Auth, $filter, $rootScope, GraphingService) {
    this.$http = $http;
    this.socket = socket;

    // Note: these variables are wrappers for the actual data
    // we want to use in order to keep the data in the controllers
    // up to date
    var userWr = [];
    var nodeIdsWr = [];
    var nodesWr = [];
      nodesWr.content = [];
    var currNodeWr = [];
      currNodeWr.content = {info: 'Initial data', karmaPolice: 'arrest this girl'};
      // dummy initial node                       // field so we know it's dummy


    // Service logic
    // ...
    // Load further node content into nodesWr
    function load_nodes(cb){
      return $http.get('api/nodes/')
        .then(response => {
          console.log('All nodes retrieved');
          nodesWr.content = response.data;
          load_topology();
          cb(response);
        }, err => {
          console.log('Error retrieving all nodes');
          console.log(err.data);
        })
    }


    // Load one node based on id
    function load_node(node_id, cb){
      $http.get('api/nodes/' + node_id)
        .then(response => {
          console.log('Particular node retrieved');
          cb(response);
        }, err => {
          console.log('Error retrieving particular node');
          console.log(err.data);
        });
    }


    // Update prototype node info
    // Use this as example for 'put' requests
    function update_node(new_info, cb){
      var new_node = currNodeWr.content;
      new_node.info = new_info;
      console.log(new_node);
        $http.put('api/nodes/' + currNodeWr.content._id, new_node)
        .then(response => {
          console.log('Particular node updated');
          console.log(response.data);
          load_nodes((response)=>{});
          load_node(currNodeWr.content._id, (response)=>{});
          refresh_nodes();
          cb(response);
        }, err => {
          console.log('Error updating particular node');
          console.log(err.data);
        });
    }

    function refresh_nodes(){
      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('node', nodesWr.content, function(event, node, nodes){
        // This callback is fired after the comments array is updated by the socket listeners

        // sort the array every time its modified
        nodes.sort(function(a, b) {
          a = a.name;
          b = b.name;
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    }


    function load_topology(){
      $http.get('api/nodes/topology').then(
        response => {
          console.log('Topology retrieved');
          console.log(response.data[0]);
          GraphingService.formatNodes(response.data[0]);
        },
        err => {
          console.log('Error retrieving topology');
          console.log(err.data);
        }
      );
    }


    // Public API here
    var serviceObj = {
      extLoadNet: function(new_user){
        userWr.content = new_user;
        load_nodes(function(){});
      },

      getNodeList: function(){
        alert('getNodeList: '+nodes.length);
        //console.log('getNodeList: ' + nodes.length);
        return nodes;
      },
      refreshNodes: function(cb){
        socket.syncUpdates('node', nodes, cb);
      },

      // Should call function that does http requests of all the relevant info
      setNode: function(node){
        currNodeWr.content = node;
      },
      getNode: function(){
        return currNodeWr;
      },
      setUser: function(new_user){
        userWr = new_user;
      },
      getUser: function(){
        return userWr;
      },


      node: currNodeWr,
      node_list: nodesWr,
      nodeId_list: nodeIdsWr,
    };
    return serviceObj;
  });
