'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

var appendList = function(defaults) {
  return function(input) {
    return _.compact(defaults.concat(input.split(',').map(_.trim)));
  };
};

var PyMicrolibGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sensational PyMicrolib generator!'
    ));

    var key = 'pylint.ignored-classes';
    var prompts = [{
      name: key,
      message: 'Which of your classes should pylint ignore?',
      filter: appendList(['pytest']),
      when: function(){
        return this.config.get(key) == null;
      }.bind(this)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      done();
    }.bind(this));
  },

  configuring: function() {
    // http://yeoman.io/authoring/storage.html
    this.config.set(this.props);
  },

  writing: {
    pylint: function() {
      this.fs.copyTpl(
        this.templatePath('pylintrc'),
        this.destinationPath('pylintrc'),
        { props: this.config.getAll() }
      )
    }
  },
});

module.exports = PyMicrolibGenerator;
