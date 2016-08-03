module('Functionality');

test('stop/start the countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Stop after 0.55 sec
  $clock.tick(550);
  $dom.countdown('stop');
  // Should have been called once
  ok(callback.calledOnce);
  // Resume after 1 sec
  $clock.tick(1000);
  $dom.countdown('start');
  // Verify if update event was called once more after 1.2 sec
  $clock.tick(5000);
  ok(callback.callCount > 5);
});

test('pause/resume the countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Stop after 0.55 sec
  $clock.tick(550);
  $dom.countdown('pause');
  // Should have been called once
  ok(callback.calledOnce);
  // Resume after 1 sec
  $clock.tick(1000);
  $dom.countdown('resume');
  // Verify if update event was called once more after 1.2 sec
  $clock.tick(5000);
  ok(callback.callCount > 5);
});

test('toggle countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Let it count once
  $clock.tick(100);
  ok(callback.callCount === 1);
  // Toggle the countdown to pause
  $dom.countdown('toggle');
  // Test if callback wasn't invoked and toggle gain
  $clock.tick(1000);
  ok(callback.callCount === 1);
  $dom.countdown('toggle');
  // Ensure it's running again
  $clock.tick(5000);
  ok(callback.callCount > 5);
});

test('remove the countdown instance', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  $dom.countdown('remove');
  // See if noting was executed after 0.5 sec
  ok(callback.callCount === 0);
  $clock.tick(500);
});

test('remove the countdown if dom was removed', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  $dom.remove();
  // See if noting was executed after 0.5 sec
  ok(callback.callCount === 0);
  $clock.tick(500);
});

test('set countdown-instance data attr to undefined uppon remove', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  ok($dom.data('countdown-instance') !== undefined);

  $dom.countdown('remove');
  ok($dom.data('countdown-instance') === undefined);
});

test('set a new final date calling the countdown again', function() {
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2020/));
  });
  $clock.tick(500);
  // Unset the event and set a new date
  $dom.off('update.countdown').countdown('2021/10/20')
  .on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2021/));
  });
  $clock.tick(500);
});

test('starts the countdown again after being finished (issue #38)', function() {
  function twoSecondsFromNow() {
     return new Date().getTime() + 2000;
  }
  // Count the number of times
  var i = 0;
  // Start a countdown for 2secs from now and uppon finish start it again from
  // within the callback recursively
  $dom.countdown(twoSecondsFromNow()).on('finish.countdown', function() {
    ok(true, 'Countdown iteraction #' + i++);
    if (i < 2) {
      $dom.countdown(twoSecondsFromNow());
    }
  });
  // Expect 2 assertions after 4 seconds
  expect(2);
  $clock.tick(4000);
});

// Instance check against undefined, as 0 is a falsy value
// Issue #24
test('control a single instance correctly (issue #24)', function() {
  var callback = sinon.spy(),
    $single = $('<div id="single" />').appendTo('body');

  $single.countdown('2020/10/20').on('update.countdown', callback);
  // Let it count once
  $clock.tick(100);
  ok(callback.callCount === 1);
  // Toggle the countdown to pause
  $single.countdown('toggle');
  // Test if callback wasn't invoked and toggle gain
  $clock.tick(1000);
  ok(callback.callCount === 1);
  $single.countdown('toggle');
  // Ensure it's running again
  $clock.tick(5000);
  ok(callback.callCount > 5);
  // Remove the node
  $single.remove();
});

test('configure the dom update rate', function() {
  var callback = sinon.spy();
  // Setup a different update rate precision
  $dom.countdown('2020/10/20', {
    precision: 2000
  }).on('update.countdown', callback);

  // Should execute just once in 2s
  $clock.tick(2000);
  ok(callback.callCount === 1);
});

test('continue after pass the final date', function() {
  var oneSecAgo = new Date().getTime() * 1000;
  var callback = sinon.spy();
  // Setup a different update rate precision
  $dom.countdown(oneSecAgo, {
    elapse: true
  }).on('update.countdown', callback);
  // Should execute just once in 500ms
  $clock.tick(500);
  ok(callback.callCount === 1);
  // Check if event was set has elapsed
  var eventObject = callback.lastCall.args[0];
  ok(eventObject.elapsed === true);
});

test('defer the start with lazy initialization option', function() {
  var callback = sinon.spy();
  // Setup a different update rate precision
  $dom.countdown('2020/10/20', {
    defer: true
  }).on('update.countdown', callback);

  // Should not start automatically
  $clock.tick(500);
  ok(!callback.called);

  // Start the countdown
  $dom.countdown('start');
  $clock.tick(500);
  ok(callback.called);
});
