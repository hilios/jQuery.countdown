module('jQuery The Final Countdown');

// Helpers
var uid = 0, $dom;

QUnit.testStart(function() {
  $dom = $('<div id="test' + (uid++) + '" />').appendTo('body');
});

QUnit.testDone(function() {
  try{
    $dom.countdown('remove');
    $dom.remove();
    $dom = null;
  } catch(e) {
    // ... countdown wasn't created
  }
});

