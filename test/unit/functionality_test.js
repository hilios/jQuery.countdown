module('Functionality');

test('stop/start the countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Start async
  stop();
  // Stop after 0.51 sec
  setTimeout(function() {
    $dom.countdown('stop');
  }, 510);
  // Resume after 1 sec
  setTimeout(function() {
    // Should execute the updated how many times of precision required
    // Note: Se the PRECISION variable
    ok(callback.callCount === 5);
    $dom.countdown('start');
  }, 1000);
  // Verify if update event was called once more after 1.2 sec
  setTimeout(function() {
    ok(callback.callCount > 5);
    start();
  }, 1200);
});

test('pause/resume the countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Start async
  stop();
  // Stop after 0.51 sec
  setTimeout(function() {
    $dom.countdown('pause');
  }, 510);
  // Resume after 1 sec
  setTimeout(function() {
    // Should execute the updated how many times of precision required
    // Note: Se the PRECISION variable
    ok(callback.callCount === 5);
    $dom.countdown('resume');
  }, 1000);
  // Verify if update event was called once more after 1.2 sec
  setTimeout(function() {
    ok(callback.callCount > 5);
    start();
  }, 1200);
});

test('toggle countdown', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  // Start async
  stop();
  // Toggle the countdown to pause
  $dom.countdown('toggle');
  // Test if callback wasn't invoked and toggle gain
  setTimeout(function() {
    ok(callback.callCount === 0);
    // Resume
    $dom.countdown('toggle');
  }, 100);
  // Ensure it's running
  setTimeout(function() {
    ok(callback.callCount > 0);
    start();
  }, 500);
});

test('remove the countdown instance', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  $dom.countdown('remove');
  // Start async
  stop();
  // See if noting was executed after 0.5 sec
  setTimeout(function() {
    ok(callback.callCount === 0);
    start();
  }, 500);
});

test('remove the countdown if dom was removed', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  $dom.remove();
  // Start async
  stop();
  // See if noting was executed after 0.5 sec
  setTimeout(function() {
    ok(callback.callCount === 0);
    start();
  }, 500);
});

test('set countdown-instance data attr to undefined uppon remove', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  ok($dom.data('countdown-instance') !== undefined);

  $dom.countdown('remove');
  ok($dom.data('countdown-instance') === undefined);
});

test('set a new final date calling the countdown again', function() {
  stop();
  $dom.countdown('2020/10/20')
  .on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2020/));
  })
  .off('update.countdown')
  .countdown('2021/10/20')
  .on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2021/));
    start();
  });
});


test('starts the countdown again after being finished (issue #38)', function() {
  var interactions = 0;
  function startCounting() {
    var twoSecondsFromNow = new Date().getTime() + (500);
    $dom.countdown(twoSecondsFromNow)
    .on('finish.countdown', function() {
      interactions++;
      switch(interactions) {
        case 1:
          ok(true, 'Countdown finished, restarting...');
          startCounting();
          break;
        case 2:
          ok(true, 'Countdown restarted succesfully!');
          start();
          break;
      }
    });
  }
  // Start async
  stop();
  startCounting();
});

// Instance check against undefined, as 0 is a falsy value
// Issue #24
test('control a single instance correctly (issue #24)', function() {
  var callback = sinon.spy(),
    $single = $('<div id="single" />').appendTo('body');
  // Start async
  stop();
  $single.countdown('2020/10/20').on('update.countdown', callback);
  // Stop after 0.51 sec
  setTimeout(function() {
    $single.countdown('stop');
  }, 510);
  // Resume after 1 sec
  setTimeout(function() {
    // Should execute the updated how many times of precision required
    // Note: Se the PRECISION variable
    ok(callback.callCount === 5);
    $single.countdown('start');
  }, 1000);
  // Verify if update event was called once more after 1.2 sec
  setTimeout(function() {
    ok(callback.callCount > 5);
    start();
  }, 1200);
});
