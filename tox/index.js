'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'projectName',
      message: 'What\'s your project name',
      default: this.appname,
      when: function () {
        return this.config.get('projectName') == null;
      }.bind(this)
    }, {
      type: 'checkbox',
      name: 'py-versions',
      message: 'Which versions of python should we use?',
      choices: [
        { value: 'py26', checked: true },
        { value: 'py27', checked: true },
        { value: 'py33' },
        { value: 'py34', checked: true },
        { value: 'pypy' },
        { value: 'pypy3' }
      ],
      validate: function (answer) {
        return answer.length > 0 ? true : 'We need at least one version'
      },
      when: function () {
        return this.config.get('py-versions') == null;
      }.bind(this)
    }, {
      type: 'input',
      name: 'coverage-acceptance',
      message: 'What\'s the minimum acceptable coverage percentage?',
      default: 100,
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: Number,
      when: function () {
        return this.config.get('coverage-acceptance') == null;
      }.bind(this)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  configuring: function () {
    // http://yeoman.io/authoring/storage.html
    this.config.set(this.props);
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('tox.ini'),
      this.destinationPath('tox.ini'),
      {
        props: this.config.getAll()
      }
    );

    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
      {
        env: this.props['py-versions'].map(function (version) {
          return '    - TOXENV=' + version + '\n';
        }).join('')
      }
    );
  }
});
