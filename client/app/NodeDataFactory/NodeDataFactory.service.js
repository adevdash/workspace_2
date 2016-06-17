'use strict';

/*
* It's probably bad practice, but I'm going to have this
* service handling most of the data management, probably.
*
*
 */
angular.module('NodeDataFactory', ['NodeFilterModule', 'NodeFormat'])
  .factory('NodeDataFactory', function ($http, socket, Auth, $filter, $rootScope) {
    this.$http = $http;
    this.socket = socket;

    // Note: these variables are wrappers for the actual data
    // we want to use in order to keep the data in the controllers
    // up to date
    var userWr = [];
    var nodeIdsWr = [];
    var nodesWr = [];
      nodesWr.content = [];
    var networksWr = [];
    var networkWr = [];
    var currNodeWr = [];
      currNodeWr.content = {info: 'Initial data', karmaPolice: 'arrest this girl'};
      // dummy initial node                       // field so we know it's dummy
    var restrictedNodesWr = [];
      restrictedNodesWr.content = [];
    var formattedNodesWr = [];
      formattedNodesWr.content = [];
    var graphNodesWr = [];
      graphNodesWr.content = [];
    var graphLinksWr = [];
      graphLinksWr = [];
    var forceWr = [];

    var heightWr = [], widthWr = [];
    var tickFunctionWr = [];


    // Service logic
    // ...
    // Load all networks
    function load_nets(cb){
      $http.get('api/networks/')
        .then(response => {
          console.log('All networks retrieved');
          networksWr.content = response.data;
          cb();
        }, err => {
          console.log('Error retrieving all networks');
          console.log(err.data);
          //handleError(err);
        });
    }
    // Load one network based on user
    function load_net(net_id){
      $http.get('api/networks/' + net_id)
        .then(response => {
          console.log('User\'s network retrieved');
          networkWr.content = response.data;
          //console.log(networkWr);
          nodeIdsWr.content = networkWr.content.nodes;
          load_nodes(function(response){

          });
        }, err => {
          console.log('Error retrieving user\'s network');
          console.log(err.data);
          //handleError(err);
        });
    }
    // Load further node content into nodesWr
    function load_nodes(cb){
      return $http.get('api/nodes/')
        .then(response => {
          //console.log(response);
          console.log('All nodes retrieved');
          nodesWr.content = response.data;
          restrictedNodesWr.content = $filter('NodeFilter')(nodesWr.content, networkWr.content.nodes);
          format_nodes(restrictedNodesWr.content);
          cb(response);
        }, err => {
          console.log('Error retrieving all nodes');
          console.log(err.data);
        })
    }


    // Load rando network
    function load_rando_net(){
      load_nets(function(){
        //console.log('Num networks: ' + networksWr.content.length);
        //console.log(networksWr);
        networkWr.content = networksWr.content[Math.floor(Math.random() * networksWr.content.length)];
        nodeIdsWr.content = networkWr.content.nodes;
        load_nodes(function(response){});
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


    // Update prototype node info
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

    // Puts nodes into JSON format
    function format_nodes(nodes){
      formattedNodesWr.content = $filter('NodeFormat')(nodes);
      graphLinksWr.content = formattedNodesWr.content.links;
      graphNodesWr.content = formattedNodesWr.content.nodes;

      var color = d3.scale.category20()
      var force = d3.layout.force()
        .size([widthWr.content, heightWr.content])
        .linkStrength(0.1)    // 0.1
        .friction(0.9)        // 0.9
        .linkDistance(100)     // 30
        .charge(-600)         // -160
        .gravity(0.1)         // 0.1
        .theta(0.8)           // 0.8
        .alpha(0.1);          // 0.1

      for(var i=0; i < graphLinksWr.content.length ; i++){
        graphLinksWr.content[i].strokeWidth = Math.round(Math.sqrt(graphLinksWr.content[i].value))
      }
      for(var i=0; i < graphNodesWr.content.length ; i++){
        graphNodesWr.content[i].color = color(i)
      }

      force
        .nodes(graphNodesWr.content)
        .links(graphLinksWr.content)
        .on("tick", function(){$rootScope.$apply()})
        .start();

      forceWr.content = force;
    }


    // Public API here
    var serviceObj = {
      extLoadNet: function(new_user){
        userWr.content = new_user;
        if(!Auth.isLoggedIn()){
          load_rando_net();
          return;
        }
        //console.log(userWr.content.network);
        load_net(userWr.content.network);
      },

      getNodeList: function(){
        alert('getNodeList: '+nodes.length);
        //console.log('getNodeList: ' + nodes.length);
        return nodes;
      },
      refreshNodes: function(cb){
        socket.syncUpdates('node', nodes, cb);
      },

      setNode: function(node){
        currNodeWr.content = node;
      },
      getNode: function(){
        return currNodeWr;
      },

      setNets: function(new_networks){
        networksWr = new_networks;
      },
      getNets: function(){
        return networksWr;
      },

      setCurNet: function(){

      },
      getCurNet: function(){
        return networkWr;
      },

      setUser: function(new_user){
        userWr = new_user;
      },
      getUser: function(){
        return userWr;
      },

      updateNodeInfo: function(new_info, cb){
        update_node(new_info, cb);
      },

      getNodeData: function(node_id){

      },

      setHeightWidth: function(width, height){
        widthWr.content = width;
        heightWr.content = height;
      },
      setTickFunction: function(tickFxn){
        tickFunctionWr.content = tickFxn;
      },

      node: currNodeWr,
      net: networkWr,
      node_list: nodesWr,
      nodeId_list: nodeIdsWr,
      restricted_node_list: restrictedNodesWr,
      formatted_nodes: formattedNodesWr,
      graph_nodes_wr: graphNodesWr,
      graph_links_wr: graphLinksWr,
      force: forceWr
    };
    return serviceObj;
  });
