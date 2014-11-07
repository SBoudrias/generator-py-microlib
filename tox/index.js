'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('projectName', {
      type: String,
      desc: 'project name'
    });
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
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
        return answer.length > 0 ? true : 'We need at least one version';
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
        return valid || 'Please enter a number';
      },
      filter: Number,
      when: function () {
        return this.config.get('coverage-acceptance') == null;
      }.bind(this)
    }];

    this.prompt(prompts, function (props) {
      // http://yeoman.io/authoring/storage.html
      this.config.set(props);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('tox.ini'),
      this.destinationPath('tox.ini'),
      {
        projectName: this.options.projectName,
        props: this.config.getAll()
      }
    );

    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
      {
        env: this.config.get('py-versions').map(function (version) {
          return '    - TOXENV=' + version + '\n';
        }).join('')
      }
    );
  }
});
