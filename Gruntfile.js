'use strict';

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: [
        'Gruntfile.js',
        'src/**/*.js'
      ],
      tasks: [
        'jshint'
        //'test'
      ]
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
          'angular-snap.min.css': 'src/styles/angular-snap.less'
        }
      },
      debug: {
        files: {
          'angular-snap.css': 'src/styles/angular-snap.less'
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
        dest: 'angular-snap.js'
      }
    },

    uglify: {
      production: {
        files: {
          'angular-snap.min.js': 'angular-snap.js'
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
