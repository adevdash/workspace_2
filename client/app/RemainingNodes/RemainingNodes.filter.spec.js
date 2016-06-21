'use strict';

describe('Filter: RemainingNodes', function () {

  // load the filter's module
  beforeEach(module('RemainingNodes'));

  // initialize a new instance of the filter before each test
  var RemainingNodes;
  beforeEach(inject(function ($filter) {
    RemainingNodes = $filter('RemainingNodes');
  }));

  it('should return the input prefixed with "RemainingNodes filter:"', function () {
    var text = 'angularjs';
    expect(RemainingNodes(text)).to.equal('RemainingNodes filter: ' + text);
  });

});
