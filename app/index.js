'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  initializing: function () {
      this.composeWith('py-microlib:tox', {}, {
        local: path.join(__dirname, '../tox/index.js'),
        link: 'strong'
      });
      this.composeWith('py-microlib:pylint', {}, {
        local: path.join(__dirname, '../pylint/index.js'),
        link: 'strong'
      });
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the sensational PyMicrolib generator!'
    ));
  }
});
