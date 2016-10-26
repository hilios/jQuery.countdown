module('Events');

test('trigger the update event', function() {
  var callback = sinon.spy();
  $dom.countdown('2020/10/20').on('update.countdown', callback);
  $clock.tick(500);
  ok(callback.callCount > 0);
});

test('trigger the finish event', function() {
  var now = new Date();
  var callback = sinon.spy();
  $dom.countdown(now).on('finish.countdown', callback);
  // Expect the callback to be called once (Issue #82)
  $clock.tick(2000);
  ok(callback.callCount === 1);
});

test('event object has {type, strftime, finalDate, offset, elapsed} ' +
     'properties', function() {
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.hasOwnProperty('type'));
    ok(event.hasOwnProperty('strftime'));
    ok(event.hasOwnProperty('finalDate'));
    ok(event.hasOwnProperty('offset'));
    ok(event.hasOwnProperty('elapsed'));
  });
  $clock.tick(500);
});

test('event.offset object has {seconds, minutes, hours, days, ' +
     'totalDays, weeks, years} properties', function() {
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.offset.hasOwnProperty('seconds'));
    ok(event.offset.hasOwnProperty('minutes'));
    ok(event.offset.hasOwnProperty('hours'));
    ok(event.offset.hasOwnProperty('days'));
    ok(event.offset.hasOwnProperty('daysToWeek'));
    ok(event.offset.hasOwnProperty('daysToMonth'));
    ok(event.offset.hasOwnProperty('weeks'));
    ok(event.offset.hasOwnProperty('weeksToMonth'));
    ok(event.offset.hasOwnProperty('years'));
    ok(event.offset.hasOwnProperty('totalDays'));
    ok(event.offset.hasOwnProperty('totalHours'));
    ok(event.offset.hasOwnProperty('totalMinutes'));
    ok(event.offset.hasOwnProperty('totalSeconds'));
  });
  $clock.tick(500);
});

test('allow the callback be setted uppon initialization (legacy ' +
     'style)', function() {
  $dom.countdown('2020/10/20', function(event) {
    ok(true); // Up to this point the event was dispatched
  });
  $clock.tick(500);
});

test('event leaking and collision', function() {
  var event;
  var future = new Date().getTime() + 5000;
  var clickHandler = sinon.spy();
  var updateHandler = sinon.spy();

  $dom.countdown(future)
    .on('click', clickHandler)
    .on('update.countdown', updateHandler);
  $clock.tick(500);

  ok(!clickHandler.called);
  ok(updateHandler.called);

  event = updateHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');

  $dom.trigger('click');
  updateHandler.reset();

  ok(clickHandler.called);
  ok(!updateHandler.called);

  // Trigger event without the namespace
  $dom.trigger('update');
  ok(updateHandler.called);

  event = updateHandler.lastCall.args[0];
  ok(event.namespace === '');
});

test('event bubbling with event listeners registered after ' +
     'invocation', function() {
  var $doc = $(document),
      event,
      future = new Date().getTime() + 5000,
      updateHandler = sinon.spy(),
      finishHandler = sinon.spy();

  $dom.countdown(future);

  $doc
    .on('update.countdown', updateHandler)
    .on('finish.countdown', finishHandler);
  $clock.tick(500);

  ok(updateHandler.called);

  event = updateHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'update');
  ok(!event.elapsed);

  $clock.tick(5000);
  ok(updateHandler.called);

  event = finishHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'finish');
  ok(event.elapsed);

  // cleanup
  $doc = null;
});

test('event bubbling with event listeners registered before ' +
     'invocation', function() {
  var $doc = $(document),
      event,
      future = new Date().getTime() + 5000,
      updateHandler = sinon.spy(),
      finishHandler = sinon.spy();

  $doc
    .on('update.countdown', updateHandler)
    .on('finish.countdown', finishHandler);

  $dom.countdown(future);
  $clock.tick(500);

  ok(updateHandler.called);

  event = updateHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'update');
  ok(!event.elapsed);

  $clock.tick(5000);
  ok(updateHandler.called);

  event = finishHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'finish');
  ok(event.elapsed);

  // cleanup
  $doc = null;
});

test('event listeners on parent and deferred invocation', function() {
  var $doc = $(document),
      event,
      future = new Date().getTime() + 5000,
      updateHandler = sinon.spy(),
      finishHandler = sinon.spy();

  $dom.countdown(future, {defer: true});

  $doc
    .on('update.countdown', updateHandler)
    .on('finish.countdown', finishHandler);

  $clock.tick(500);

  ok(!updateHandler.called);
  ok(!finishHandler.called);

  $dom.countdown('start');
  $clock.tick(500);

  ok(updateHandler.called);

  event = updateHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'update');
  ok(!event.elapsed);

  $clock.tick(5000);
  ok(updateHandler.called);

  event = finishHandler.lastCall.args[0];
  ok(event.namespace === 'countdown');
  ok(event.type === 'finish');
  ok(event.elapsed);

  // cleanup
  $doc = null;
});
