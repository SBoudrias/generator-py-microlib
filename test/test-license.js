/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('py-microlib:license', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../license'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .on('end', done);
  });

  it('creates files', function () {
    assert.file(['LICENSE']);
  });
});
