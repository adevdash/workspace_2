'use strict';

describe('Filter: NodeFilter', function () {

  // load the filter's module
  beforeEach(module('NodeFilter'));

  // initialize a new instance of the filter before each test
  var nodeFilter;
  beforeEach(inject(function ($filter) {
    nodeFilter = $filter('NodeFilter');
  }));

  it('should return the input prefixed with "NodeFilter filter:"', function () {
    var text = 'angularjs';
    expect(nodeFilter(text)).to.equal('NodeFilter filter: ' + text);
  });

});
