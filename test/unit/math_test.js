module('Math');

test('time offset calculation', function() {
  var testDate = new Date().getTime();
  testDate += 7 * 24 * 60 * 60 * 1000; // 1 week
  testDate += 2 * 24 * 60 * 60 * 1000; // 2 days
  testDate += 3 * 60 * 60 * 1000;      // 3 hours
  testDate += 4 * 60 * 1000;           // 4 minutes
  testDate += 5 * 1000;                // 5 seconds

  $dom.countdown(testDate).on('update.countdown', function(event) {
    ok(event.offset.weeks     === 1);
    ok(event.offset.days      === 2);
    ok(event.offset.hours     === 3);
    ok(event.offset.minutes   === 4);
    ok(event.offset.seconds   === 5);
    // Offset values
    ok(event.offset.daysToWeek    === 2);
    ok(event.offset.daysToMonth   === 9);
    ok(event.offset.weeksToMonth  === 1);
    // Test total count
    ok(event.offset.totalDays     === 9);
    ok(event.offset.totalHours    === 9 * 24 + 3);
    ok(event.offset.totalMinutes  === 9 * 24 * 60 + 3 * 60 + 4);
    ok(event.offset.totalSeconds  === (9 * 24 * 60 + 3 * 60 + 4) * 60 + 5);
  });

  $clock.tick(500);
});

test('days differencence for week and month offset (Issue #125)', function() {
  var now = new Date(2015, 6, 16).getTime();
  $clock = sinon.useFakeTimers(now);

  var testDate = new Date(2015, 8, 25).getTime();

  $dom.countdown(testDate).on('update.countdown', function(event) {
    ok(event.offset.months === 2);
    ok(event.offset.daysToMonth === 10);
  });

  $clock.tick(500);
});

test('years offset calculation (Issue #125)', function() {
  var now = new Date(2014, 0, 1).getTime();
  $clock = sinon.useFakeTimers(now);

  var testDate = new Date(2015, 0, 1).getTime();

  $dom.countdown(testDate).on('update.countdown', function(event) {
    ok(event.offset.years === 1);
  });

  $clock.tick(500);
});
