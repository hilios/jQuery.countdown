// Karma configuration for RequireJS integration
module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: [
      'requirejs',
      'qunit',
      'sinon'
    ],
    files: [
      {
        pattern: 'test/vendor/jquery-2.1/dist/jquery.js',
        included: false
      },
      {
        pattern: 'src/**/*.js',
        included: false
      },
      'test/integration/*.config.js',
      'test/integration/*test.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    reporters: [
      'dots'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [
      'PhantomJS'
    ],
    autoWatch: false,
    singleRun: true
  });
};
