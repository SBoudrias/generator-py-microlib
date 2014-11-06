/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var os = require('os');
var childProcess = require('child_process');
var rimraf =  require('rimraf');

var testRoot = path.join(os.tmpdir(), './temp-test');
var fixtureFile = function(name) {
    fs.writeFileSync(name, fs.readFileSync(path.join(__dirname, 'fixtures', name)));
};

describe('py-microlib:app', function () {
  beforeEach(function () {
    this.run = helpers.run(path.join(__dirname, '../app'))
      .inDir(testRoot)
      .withOptions({'skip-install': true});
  });

  afterEach(function (done) {
    rimraf(testRoot, done);
  });

  describe('without ignored classes', function(){
    beforeEach(function(done) {
      this.run
        .withPrompt({'pylint.ignored-classes': []})
        .on('end', done);
    });
    it('creates files', function () {
      assert.file(['pylintrc']);
    });
    it('doesn\'t ignore MyClass', function(done) {
      fixtureFile('demo.py');
      childProcess.execFile(
        'pylint',
        ['demo.py'],
        function(error, stdout, stderr){
          assert.equal(error.code, 2);
          assert.equal(stderr, '');
          if (stdout.indexOf('Class \'MyClass\' has no \'x\' member') < 0) {
            throw Error(stdout);
          }
          done();
        }
      );
    });
  });


  describe('with ignored classes', function(){
    beforeEach(function(done) {
      this.run
        .withPrompt({'pylint.ignored-classes': ['MyClass']})
        .on('end', done);
    });
    it('creates files', function () {
      assert.file(['pylintrc']);
    });
    it('doesn\'t ignore MyClass', function(done) {
      fixtureFile('demo.py');
      childProcess.execFile(
        'pylint',
        ['demo.py'],
        function(error, stdout, stderr){
          assert.equal(error, null);
          assert.equal(stderr, '');
          if (stdout.indexOf('Class \'MyClass\' has no \'x\' member') >= 0) {
            throw Error(stdout);
          }
          done();
        }
      );
    });
  });
});
