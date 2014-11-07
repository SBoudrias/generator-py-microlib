/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var testRoot = path.join(os.tmpdir(), './temp-test');

describe('py-microlib:Makefile', function () {
  beforeEach(function (done) {
    this.run = helpers.run(path.join(__dirname, '../Makefile'))
      .inDir(testRoot)
      .withOptions({'skip-install': true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file(['Makefile']);
  });
});
