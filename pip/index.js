'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var defaults = [
  '-e .',
  'coverage',
  'flake8',
  'pre-commit',
  'pylint'
];

var PyMicrolibGenerator = yeoman.generators.Base.extend({
  writing: function () {
    var current = [];
    try {
      current = this.fs.read('requirements_dev.txt').split('\n');
    } catch(e) {}
    var requirements = _.uniq(current.concat(defaults).sort()).join('\n');
    this.fs.write(this.destinationPath('requirements_dev.txt'), requirements);
  }
});

module.exports = PyMicrolibGenerator;
