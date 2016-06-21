'use strict';

describe('Filter: UsersToManagers', function () {

  // load the filter's module
  beforeEach(module('UsersToManagers'));

  // initialize a new instance of the filter before each test
  var UsersToManagers;
  beforeEach(inject(function ($filter) {
    UsersToManagers = $filter('UsersToManagers');
  }));

  it('should return the input prefixed with "UsersToManagers filter:"', function () {
    var text = 'angularjs';
    expect(UsersToManagers(text)).to.equal('UsersToManagers filter: ' + text);
  });

});
