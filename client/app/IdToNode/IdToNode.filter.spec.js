'use strict';

describe('Filter: IdToNode', function () {

  // load the filter's module
  beforeEach(module('IdToNode'));

  // initialize a new instance of the filter before each test
  var IdToNode;
  beforeEach(inject(function ($filter) {
    IdToNode = $filter('IdToNode');
  }));

  it('should return the input prefixed with "IdToNode filter:"', function () {
    var text = 'angularjs';
    expect(IdToNode(text)).to.equal('IdToNode filter: ' + text);
  });

});
