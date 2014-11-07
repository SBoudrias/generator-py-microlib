'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  initializing: function () {
    [
      'tox',
      'pylint',
      'coverage',
      'git',
      'license',
      'pip',
      'Makefile'
    ].forEach(function (gen) {
      this.composeWith('py-microlib:' + gen, {}, {
        local: path.join(__dirname, '..', gen, 'index.js')
      })
    }, this);
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the sensational PyMicrolib generator!'
    ));
  }
});
