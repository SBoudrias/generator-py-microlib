'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  writing: function () {
    this.fs.copy(
      this.templatePath('license-mit'),
      this.destinationPath('LICENSE')
    );
  }
});
