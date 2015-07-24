module('jQuery The Final Countdown');

// Helpers
var uid = 0, $dom, $clock;

QUnit.testStart(function() {
  $clock = sinon.useFakeTimers();
  $dom = $('<div id="test' + (uid++) + '" />').appendTo('body');
});

QUnit.testDone(function() {
  $clock.restore();
  try{
    $dom.countdown('remove');
    $dom.remove();
    $dom = null;
  } catch(e) {
    // ... countdown wasn't created
  }
});
