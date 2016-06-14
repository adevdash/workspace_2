'use strict';

(function() {

  class AdminController {
    constructor(User, Auth) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.getCurrentUser = Auth.getCurrentUser;
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    promote(user){

    }
  }

  angular.module('workspace2App.admin')
    .controller('AdminController', AdminController);
})();
