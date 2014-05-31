/*jslint node: true, indent:2*/
"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg     : grunt.file.readJSON('package.json'),
    jshint  : {
      all     : ['package.json', 'bower.json', 'curp.js', 'Gruntfile.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', [
    'jshint'
  ]);

};

