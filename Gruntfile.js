/*jshint node:true */

'use strict';

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'src/scripts/**/*.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify'
          //'test'
        ]
      },
      styles: {
        files: 'src/styles/**/*.less',
        tasks: ['less']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: ['Gruntfile.js'],
      src: ['src/**/*.js']
    },

    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          'dist/angular-snap.min.css': 'src/styles/angular-snap.less'
        }
      },
      debug: {
        files: {
          'dist/angular-snap.css': 'src/styles/angular-snap.less'
        }
      }
    },

    concat: {
      debug: {
        options: {
          stripBanners: true
        },
        src: [
          'src/scripts/*.js',
          'src/scripts/*/*.js'
        ],
        dest: 'dist/angular-snap.js'
      }
    },

    uglify: {
      production: {
        files: {
          'dist/angular-snap.min.js': 'dist/angular-snap.js'
        }
      }
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Register task(s)
  grunt.registerTask('default', [
    'jshint',
    //'test',
    'less',
    'concat',
    'uglify'
  ]);

};
