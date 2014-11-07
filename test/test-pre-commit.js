/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var os = require('os');

var testRoot = path.join(os.tmpdir(), './temp-test');

describe('py-microlib:pre-commit', function () {
  beforeEach(function (done) {
    this.run = helpers.run(path.join(__dirname, '../pre-commit'))
      .inDir(testRoot)
      .on('end', done);
  });

  it('creates git configs', function () {
    assert.file(['.pre-commit-config.yaml']);
  });
});
