module('Events');

test('trigger the update event', function() {
  stop();
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(true); // Up to this point the event was dispatched
    start();
  });
});

test('trigger the finish event', function() {
  stop();
  $dom.countdown('2010/10/20').on('finish.countdown', function(event) {
    ok(true); // Up to this point the event was dispatched
    start();
  });
});

test('event object has {type, strftime, finalDate, offset} ' +
     'properties', function() {
  stop();
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.hasOwnProperty('type'));
    ok(event.hasOwnProperty('strftime'));
    ok(event.hasOwnProperty('finalDate'));
    ok(event.hasOwnProperty('offset'));
    start();
  });
});

test('event.offset object has {seconds, minutes, hours, days, ' +
     'totalDays, weeks, years} properties', function() {
  stop();
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.offset.hasOwnProperty('seconds'));
    ok(event.offset.hasOwnProperty('minutes'));
    ok(event.offset.hasOwnProperty('hours'));
    ok(event.offset.hasOwnProperty('days'));
    ok(event.offset.hasOwnProperty('totalDays'));
    ok(event.offset.hasOwnProperty('weeks'));
    ok(event.offset.hasOwnProperty('years'));
    start();
  });
});

test('allow the callback be setted uppon initialization (legacy ' +
     'style)', function() {
  $dom.countdown('2020/10/20', function(event) {
    ok(true); // Up to this point the event was dispatched
  });
});
