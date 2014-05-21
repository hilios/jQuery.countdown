// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'qunit',
      'sinon'
    ],
    files: [
      'test/vendor/jquery-2.1/dist/jquery.js',
      'test/*.config.js',
      'src/**/*.js',
      'test/unit/**/*test.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    reporters: [
      'dots',
      'coverage'
    ],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      type: 'text',
      dir: 'test/coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    browsers: [
      'PhantomJS'
    ],
    autoWatch: false,
    singleRun: true
  });
};
