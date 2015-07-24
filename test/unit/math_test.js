module('Math');

test('time offset calculation', function() {
  var testDate = new Date().getTime();
  testDate += 7 * 24 * 60 * 60 * 1000; // 1 week
  testDate += 2 * 24 * 60 * 60 * 1000; // 2 days
  testDate += 3 * 60 * 60 * 1000;      // 3 hours
  testDate += 4 * 60 * 1000;           // 4 minutes
  testDate += 5 * 1000;                // 5 seconds

  $dom.countdown(testDate).on('update.countdown', function(event) {
    ok(event.offset.weeks   === 1);
    ok(event.offset.days    === 2);
    ok(event.offset.hours   === 3);
    ok(event.offset.minutes === 4);
    ok(event.offset.seconds === 5);
    ok(event.offset.totalDays === 9);
  });

  $clock.tick(500);
});
