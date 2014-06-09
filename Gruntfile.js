/*jslint node: true, indent:2*/
"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg     : grunt.file.readJSON('package.json'),
    jslint  : {
      all     : {
        src : ['package.json', 'bower.json', 'curp.js', 'Gruntfile.js'],
        directives : {
          indent : 2,
          node   : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');

  // Default task(s).
  grunt.registerTask('default', [
    'jslint'
  ]);

};

