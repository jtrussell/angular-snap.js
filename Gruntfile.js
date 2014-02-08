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
      src: ['src/**/*.js'],
      test: {
        options: {
          jshintrc: '.test.jshintrc'
        },
        src: ['test/spec/**/*.js']
      },
      examples: ['examples/js/*.js']
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
      dist: ['dist/*'],
      examples: ['examples/lib']
    },

    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          'dist/angular-snap.min.css': 'src/styles/angular-snap.less',
          'dist/angular-snap-only.min.css': 'src/styles/angular-snap-only.less'
        }
      },
      debug: {
        files: {
          'dist/angular-snap.css': 'src/styles/angular-snap.less',
          'dist/angular-snap-only.css': 'src/styles/angular-snap-only.less'
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
          '    "angular-snap.css"',
          '  ],',
          '  "ignore": [',
          '    "README.md"',
          '  ],',
          '  "dependencies": {',
          '    "angular": "~1.2.4",',
          '    "snapjs": "latest"',
          '  }',
          '}'
        ].join('\n')
      }
    },

    connect: {
      examples: {
        options: {
          port: 9000,
          base: 'examples',
          open: 'http://localhost:9000/index.html'
        }
      }
    },

    open: {
      examples: {
        path: 'http://localhost:8080/index.html'
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

  grunt.registerTask('copy-examples-lib', function() {
    grunt.file.copy('test/components/angular/angular.js', 'examples/lib/angular/angular.js');
    grunt.file.copy('test/components/angular-route/angular-route.js', 'examples/lib/angular-route/angular-route.js');
    grunt.file.copy('test/components/snapjs/snap.js', 'examples/lib/snapjs/snap.js');
    grunt.file.copy('dist/angular-snap.js', 'examples/lib/angular-snap/angular-snap.js');
    grunt.file.copy('dist/angular-snap.css', 'examples/lib/angular-snap/angular-snap.css');
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('examples', [
    'clean:examples',
    'dist',
    'copy-examples-lib',
    'connect:examples:keepalive'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'less',
    'concat',
    'uglify',
    'copy',
    'bower'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'dist'
  ]);

};
