/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var os = require('os');
var childProcess = require('child_process');

var testRoot = path.join(os.tmpdir(), './temp-test');
var fixtureFile = function(name) {
  fs.writeFileSync(name, fs.readFileSync(path.join(__dirname, 'fixtures', name)));
};


describe('py-microlib:pylint.handleDefaults', function () {
  var pylint = require('../pylint');
  it('handles undefined input', function(){
    assert.deepEqual(
        {a:'bar,foo'},
        pylint.handleDefaults({a:undefined}, {
          a:['foo', 'bar']
        })
    );
  });
  it('errors with undefined default', function(){
    assert.throws(
        function(){
          pylint.handleDefaults({a:undefined}, {
            g:['foo', 'bar']
          });
        },
        Error
    );
  });
  it('merges defined input', function(){
    assert.deepEqual(
        {a:'bar,cat,foo,zub'},
        pylint.handleDefaults(
          {a:'cat,zub'},
          {a:['foo', 'bar']}
        )
    );
  });
});

describe('py-microlib:pylint', function () {
  beforeEach(function () {
    this.run = helpers.run(path.join(__dirname, '../pylint'))
      .inDir(testRoot)
      .withOptions({'skip-install': true});
  });

  describe('without ignored classes', function(){
    beforeEach(function(done) {
      this.run
        .withPrompt({'ignoredClasses': ''})
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
          assert.equal(stderr, '');
          if (stdout.indexOf('Class \'MyClass\' has no \'x\' member') < 0) {
            throw Error(stdout);
          }
          assert.equal(error.code, 2);
          done();
        }
      );
    });
  });


  describe('with ignored classes', function(){
    beforeEach(function(done) {
      this.run
        .withPrompt({'ignoredClasses': 'MyClass'})
        .on('end', done);
    });
    it('creates files', function () {
      assert.file(['pylintrc']);
    });
    it('does ignore MyClass', function(done) {
      fixtureFile('demo.py');
      childProcess.execFile(
        'pylint',
        ['demo.py'],
        function(error, stdout, stderr){
          assert.equal(stderr, '');
          assert.equal(stdout, '');
          assert.equal(error, null);
          done();
        }
      );
    });
  });
});
