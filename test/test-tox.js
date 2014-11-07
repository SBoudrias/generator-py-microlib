/*global describe, beforeEach, it*/
'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var ini = require('ini');
var yaml = require('js-yaml');
var testRoot = path.join(os.tmpdir(), './temp-test');

describe('py-microlib:tox', function () {
  beforeEach(function (done) {
    this.versions = ['py26', 'py33'];
    this.run = helpers.run(path.join(__dirname, '../tox'))
      .inDir(testRoot)
      .withOptions({'skip-install': true})
      .withPrompts({
        'py-versions': this.versions,
        'coverage-acceptance': 45
      })
      .on('ready', function(generator) {
        generator.config.set({ projectName: 'foo' });
      })
      .on('end', done);
  });

  it('creates tox.ini', function () {
    assert.file(['tox.ini']);
    var tox = ini.parse(fs.readFileSync('tox.ini', 'utf8'));
    assert.equal(tox.tox.project, 'foo');
    assert.equal(tox.tox.envlist, this.versions.join(','));
    assert.equal(tox.pytest.addopts, '--doctest-modules --ignore venv-foo');
    assert(tox.testenv['coverage report --show-missing --fail-under 45'])
  });

  it('creates .travis.yml', function () {
    assert.file(['.travis.yml']);
    var travis = yaml.safeLoad(fs.readFileSync('.travis.yml', 'utf8'));
    assert.deepEqual(travis.env, ['TOXENV=py26', 'TOXENV=py33'])
  });
});
