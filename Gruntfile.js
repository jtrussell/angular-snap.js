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

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        browsers: [process.env.KARMA_BROWSER || 'Firefox']
      }
    },

    clean: {
      dist: ['dist/*']
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
    },

    copy: {
      dist: {
        src: 'LICENSE-MIT',
        dest: 'dist/'
      }
    },

    bower: {
      dist: {
        dest: 'dist/bower.json',
        contents: [
          '{',
          '  "name": "angular-snap",',
          '  "version": "<%= pkg.version %>",',
          '  "main": [',
          '    "angular-snap.js",',
          '    "angular-snap.min.js",',
          '    "angular-snap.css",',
          '    "angular-snap.min.css"',
          '  ],',
          '  "ignore": [',
          '    "README.md"',
          '  ],',
          '  "dependencies": {',
          '    "angular": "~1.0.5",',
          '    "snapjs": "latest"',
          '  }',
          '}'
        ].join('\n')
      }
    }
  });

  // Load plugins
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerMultiTask('bower', 'Write out a bower.json file for distribution', function() {
    grunt.file.write(this.data.dest, this.data.contents);
    grunt.log.writeln('File "' + this.data.dest + '" created.');
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('dist', [
    'clean',
    'less',
    'concat',
    'uglify',
    'copy',
    'bower'
  ]);

  grunt.registerTask('default', [
    'test',
    'dist'
  ]);

};
