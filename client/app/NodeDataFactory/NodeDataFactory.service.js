'use strict';

/*
* It's probably bad practice, but I'm going to have this
* service handling most of the data management, probably.
*
*
 */
angular.module('NodeDataFactory', [])
  .factory('NodeDataFactory', function ($http, socket, Auth) {
    this.$http = $http;
    this.socket = socket;

    // Note: these variables are wrappers for the actual data
    // we want to use in order to keep the data in the controllers
    // up to date
    var user_wr = [];
    var nodeIds_wr = [];
    var nodes_wr = [];
      nodes_wr.content = [];
    var networks_wr = [];
    var network_wr = [];
    var currNode_wr = [];
      currNode_wr.content = {info: 'Initial data'}; // dummy initial node



    // Service logic
    // ...
    // Load all networks
    function load_nets(cb){
      $http.get('api/networks/')
        .then(response => {
          console.log('All networks retrieved');
          networks_wr.content = response.data;
          cb();
        }, err => {
          console.log('Error retrieving all networks');
          console.log(err.data);
          //handleError(err);
        });
    };
    // Load one network based on user
    function load_net(net_id){
      $http.get('api/networks/' + net_id)
        .then(response => {
          console.log('User\'s network retrieved');
          network_wr.content = response.data;
          console.log(network_wr);
          nodeIds_wr.content = network_wr.content.nodes;
          load_nodes();
        }, err => {
          console.log('Error retrieving user\'s network');
          console.log(err.data);
          //handleError(err);
        });
    }
    // Load further node content into nodes_wr
    function load_nodes(cb){
      $http.get('api/nodes/')
        .then(response => {
          console.log('All nodes retrieved');
          cb(response);
        }, err => {
          console.log('Error retrieving all nodes');
          console.log(err.data);
        })
    }


    // Load rando network
    function load_rando_net(){
      load_nets(function(){
        console.log('Num networks: ' + networks_wr.content.length);
        console.log(networks_wr);
        network_wr.content = networks_wr.content[Math.floor(Math.random() * networks_wr.content.length)];
        nodeIds_wr.content = network_wr.content.nodes;
        load_nodes();
      });
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



    // Public API here
    var serviceObj = {
      extLoadNet: function(new_user){
        user_wr.content = new_user;
        if(!Auth.isLoggedIn()){
          load_rando_net();
          return;
        }
        console.log(user_wr.content.network);
        load_net(user_wr.content.network);
      },

      getNodeList: function(){
        alert('getNodeList: '+nodes.length);
        console.log('getNodeList: ' + nodes.length);
        return nodes;
      },
      refreshNodes: function(cb){
        socket.syncUpdates('node', nodes, cb);
      },

      setNode: function(node){
        //angular.copy(node, currNode);
        //thisNode = node;
        currNode_wr.content = node;
      },
      getNode: function(){
        return currNode_wr;
      },

      setNets: function(new_networks){
        networks_wr = new_networks;
      },
      getNets: function(){
        return networks_wr;
      },

      setCurNet: function(){

      },
      getCurNet: function(){
        return network_wr;
      },

      setUser: function(new_user){
        user_wr = new_user;
      },
      getUser: function(){
        return user_wr;
      },

      getNodeData: function(node_id){

      },

      node: currNode_wr,
      net: network_wr,
      node_list: nodes_wr,
      nodeId_list: nodeIds_wr
    };
    return serviceObj;
  });
