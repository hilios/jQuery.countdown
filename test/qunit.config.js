module('jQuery The Final Countdown');

// Helpers
var uid = 0, $dom;

// QUnit.config.autostart = false;

QUnit.testStart(function() {
  $dom = $('<div id="test' + (uid++) + '" />').appendTo('body');
});

QUnit.testDone(function() {
  try{
    $dom.countdown('remove');
    $dom.remove();
    delete $dom;
  } catch(e) {
    // ... countdown wasn't created
  }
});

