'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.menu = [];
      this.menu[0] = {"title": "About", "state": "about"};

    this.searchText = '';
  }

}

angular.module('workspace2App')
  .controller('NavbarController', NavbarController);
