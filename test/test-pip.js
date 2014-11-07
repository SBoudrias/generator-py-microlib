/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

describe('py-microlib:pip', function () {
  beforeEach(function () {
    this.run = helpers.run(path.join(__dirname, '../pip'))
      .inDir(path.join(os.tmpdir(), './temp-test'));
  });

  describe('without requirements', function () {
    beforeEach(function (done) {
      this.run.on('end', done);
    });

    it('creates file', function () {
      assert.fileContent([
        ['requirements_dev.txt', /^pylint$/m],
        ['requirements_dev.txt', /^coverage$/m],
        ['requirements_dev.txt', /^flake8$/m],
        ['requirements_dev.txt', /^pre\-commit$/m],
        ['requirements_dev.txt', /^\-e \.$/m]
      ]);
    });
  });

  describe('with requirements file', function () {
    beforeEach(function (done) {
      this.run
        .on('ready', function (gen) {
          var contents = 'foo\npylint\n';
          gen.fs.write(gen.destinationPath('requirements_dev.txt'), contents);
        })
        .on('end', done);
    });

    it('creates file', function () {
      assert.fileContent([
        ['requirements_dev.txt', /^pylint$/m],
        ['requirements_dev.txt', /^coverage$/m],
        ['requirements_dev.txt', /^flake8$/m],
        ['requirements_dev.txt', /^pre\-commit$/m],
        ['requirements_dev.txt', /^\-e \.$/m],
        ['requirements_dev.txt', /^foo$/m]
      ]);

      var contents = fs.readFileSync('requirements_dev.txt', 'utf8');
      assert.equal(contents.match(/pylint/).length, 1);
    });
  });
});
