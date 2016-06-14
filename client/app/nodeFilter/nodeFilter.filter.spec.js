'use strict';

describe('Filter: nodeFilter', function () {

  // load the filter's module
  beforeEach(module('NodeFilter'));

  // initialize a new instance of the filter before each test
  var nodeFilter;
  beforeEach(inject(function ($filter) {
    nodeFilter = $filter('nodeFilter');
  }));

  it('should return the input prefixed with "nodeFilter filter:"', function () {
    var text = 'angularjs';
    expect(nodeFilter(text)).to.equal('nodeFilter filter: ' + text);
  });

});
