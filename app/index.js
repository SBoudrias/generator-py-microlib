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

    var prompts = [{
      name: 'pylint.ignored-classes',
      message: 'Which of your classes should pylint ignore?',
      filter: appendList(['pytest']),
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    pylint: function() {
      this.template(
        'pylintrc',
        'pylintrc',
        { props: this.props }
      );
    }
  },
});

module.exports = PyMicrolibGenerator;
