define('test/integration/requirejs_test',
      ['jquery', 'jquery.countdown'], function($) {

  test('integration with requirejs', function() {
    ok(!!$.fn.countdown, 'Should load the plugin via requireJS');
  });
});
