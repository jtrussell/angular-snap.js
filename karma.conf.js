
var grunt = require('grunt');

// A hack... for testing the SNAP_VERSION constant
grunt.file.write('.tmp/package-json.js', [
  ';window.SNAP = ',
  grunt.file.read('package.json'),
  ';'
].join(''));

module.exports = function(config) {
  config.set({
    autoWatch: true,
    singleRun: false,
    frameworks: ['jasmine'],
    files: [
      '.tmp/package-json.js',

      'test/components/angular/angular.js',
      'test/components/angular-mocks/angular-mocks.js',

      'src/scripts/*.js',
      'src/scripts/**/*.js',

      'test/spec/**/*.js'
    ],
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    logLevel: config.LOG_INFO
  });
};
