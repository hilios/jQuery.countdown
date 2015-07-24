module('Events');

test('trigger the update event', function() {
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(true); // Up to this point the event was dispatched
  });
  $clock.tick(500);
});

test('trigger the finish event', function() {
  var today = new Date();
  $dom.countdown(today).on('finish.countdown', function(event) {
    ok(true);
  });
  $clock.tick(500);
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
    ok(event.offset.hasOwnProperty('totalDays'));
    ok(event.offset.hasOwnProperty('weeks'));
    ok(event.offset.hasOwnProperty('years'));
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
