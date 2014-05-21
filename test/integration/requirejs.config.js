var testFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    testFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base',
  paths: {
    'jquery': 'test/vendor/jquery-2.1/dist/jquery',
    'jquery.countdown': 'src/countdown'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'jquery.countdown': {
      deps: ['jquery']
    }
  },
  deps: testFiles,
  callback: window.__karma__.start
});
