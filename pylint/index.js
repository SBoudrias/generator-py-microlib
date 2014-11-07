'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

var pylint = {
  disabled: ['missing-docstring', 'locally-disabled'],
  ignoredClasses: ['pytest'],
};


var handleDefaults = function(props, defaults) {
  defaults = defaults || pylint;
  _.each(props, function (val, key) {
    val = val || '';
    val = val.split(',');
    var defaultVal = defaults[key];
    if (defaultVal === undefined) {
      throw new Error('No default configured for "' + key + '"');
    }
    props[key] = _(defaultVal.concat(val))
      .map(_.trim)
      .compact()
      .sort()
      .uniq(true)
      .value()
      .join(',');
  });
  return props;
};


module.exports = generators.Base.extend(
  {
    prompting: function () {
      var done = this.async();

      var prompts = [
        {
          name: 'ignoredClasses',
          message: 'Which of your classes should pylint ignore?',
          when: this.config.get('ignoredClasses') == null,
        },
        {
          name: 'disabled',
          message: 'Are there any pylint rules you need to disable?',
          when: this.config.get('disabled') == null,
        },
      ];

      this.prompt(prompts, function (props) {

        this.props = {
          pylint: handleDefaults(props)
        };
        done();
      }.bind(this));
    },

    configuring: function() {
      // http://yeoman.io/authoring/storage.html
      this.config.set(this.props);
    },

    writing: function() {
      this.fs.copyTpl(
        this.templatePath('pylintrc'),
        this.destinationPath('pylintrc'),
        this.config.getAll()
      );
    },
  },
  { handleDefaults: handleDefaults }
);
