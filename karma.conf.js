// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      // 'requirejs',
      'qunit',
      'sinon'
    ],
    files: [
      'test/*.config.js',
      {
        pattern: 'lib/jquery.js',
        included: true
      },
      {
        pattern: 'src/**/*.js',
        included: true
      },
      {
        pattern: 'test/unit/**/*test.js',
        included: true
      }
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
    logLevel: config.LOG_INFO,
    browsers: [
      'PhantomJS'
    ],
    autoWatch: true,
    singleRun: false
  });
};
