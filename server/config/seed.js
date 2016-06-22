/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Node from '../api/node/node.model';
import Network from '../api/network/network.model';
import Topology from '../api/topology/topology.model';


Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

var node1, node2, node3;
Node.find({}).remove()
  .then(() => {
    node1 = new Node({name: 'Node 1', info: 'Test node 1', active: true});
    node2 = new Node({name: 'Node 2', info: 'Test node 2', active: true});
    node3 = new Node({name: 'Node 3', info: 'Test node 3', active: false});
    node1.faces.push(node2);
    node2.faces.push(node1, node3);
    node3.faces.push(node2);
    node1.save();
    node2.save();
    node3.save();
  }).then(() => {
    Topology.find().remove().then(() => {
      var t1 = new Topology();

      Node.find({}, function(err, nodes){
        for(var i in nodes){
          t1.nodes.push(nodes[i]);
        }
        t1.links.push({source: nodes[0].name, target: nodes[1].name},
                      {source: nodes[1].name, target: nodes[2].name});
        t1.save();
        console.log(t1);
      });
    });
}).then(() => {
  Network.find({}).remove().then(() => {
    var net1;
    net1 = new Network({name: 'Network 1', info: 'Test network 1'});
    net1.nodes.push(node1, node2, node3);
    //console.log(net1);
    Node.findOne({_id: net1.nodes[0]}, function(err, node){
      if(err) return handleError(err);
      //console.log(node);
    });
    //console.log(Node.findOne({_id: net1.nodes[0]}));
    net1.save();
  });
}).then(() => {
  User.find({}).remove()
    .then(() => {
      User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test',
      }, {
        provider: 'local',
        role: 'manager',
        name: 'Manager',
        email: 'manager@example.com',
        password: 'manager'
      },{
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
        .then(() => {
          User.findOne({name: 'Manager'}, function(err, user){
            if(err) return handleError(err);
            user.nodes.push(node1._id, node3._id);
            user.save();
            console.log(user);
          });
          Network.find({}, function(err, nets){
            User.find({}, function(err, users){
              if(err) return handleError(err);
              for(var i in users){
                //console.log(users[i]);
                //console.log(net1._id);
                users[i].network = nets[0]._id;
                users[i].save();
                //console.log(users[i]);
              }
            });
          });


          console.log('finished populating users.');
        });
    });
});
