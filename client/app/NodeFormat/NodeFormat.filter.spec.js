'use strict';

describe('Filter: NodeFormat', function () {

  // load the filter's module
  beforeEach(module('NodeFormat'));

  // initialize a new instance of the filter before each test
  var NodeFormat;
  beforeEach(inject(function ($filter) {
    NodeFormat = $filter('NodeFormat');
  }));

  it('should return the input prefixed with "NodeFormat filter:"', function () {
    var text = 'angularjs';
    expect(NodeFormat(text)).to.equal('NodeFormat filter: ' + text);
  });

});
