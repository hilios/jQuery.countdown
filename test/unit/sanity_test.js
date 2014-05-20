module('Sanity tests');

test('ensure DOM for testing is created', function() {
  ok($dom !== null);
  ok($dom !== undefined);
  ok($dom.length === 1);
});

test('countdown method exists within jquery selector', function() {
  ok($.fn.countdown !== undefined);
  ok($.fn.countdown !== null);
  ok($.fn.countdown);
});

test('throws an error when initiated with wrong number of args', function() {
  throws(function() {
    $('<div/>').countdown();
  });
});
