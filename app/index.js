'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the sensational PyMicrolib generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What\'s your project name',
      default: this.appname,
      when: function () {
        return this.config.get('projectName') == null;
      }.bind(this)
    }];

    this.prompt(prompts, function (props) {
      // http://yeoman.io/authoring/storage.html
      this.config.set(props);
      done();
    }.bind(this));
  },

  subgenerators: function () {
    [
      'tox',
      'pylint',
      'coverage',
      'git',
      'license',
      'pip',
      'pre-commit',
      'Makefile'
    ].forEach(function (gen) {
      this.composeWith('py-microlib:' + gen, {}, {
        local: path.join(__dirname, '..', gen, 'index.js')
      })
    }, this);
  },
});
