module('Date casting');

test('throw an error when string cannot be parsed', function() {
  throws(function() {
    $dom.countdown('Foo Bar!');
  });
});

test('accept a native Date object', function() {
  // Remember that the month starts at zero 0
  var date = new Date(2020, 7, 8, 9, 10, 11);
  $dom.countdown(date).on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Aug 08 2020 09:10:11/));
  });
  $clock.tick(500);
});

test('cast miliseconds as a string (issue #17)', function() {
  // Remember that the month starts at zero 0
  var ms = new Date(2020, 8, 9, 10, 11, 12).getTime();
  $dom.countdown(String(ms)).on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Sep 09 2020 10:11:12/));
  });
  $clock.tick(500);
});

test('cast miliseconds as a number', function() {
  // Remember that the month starts at zero 0
  var ms = new Date(2020, 8, 9, 10, 11, 12).getTime();
  $dom.countdown(Number(ms)).on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Sep 09 2020 10:11:12/));
  });
  $clock.tick(500);
});

test('cast YYYY/MM/DD hh:mm:ss', function() {
  $dom.countdown('2020/10/20 12:34:56').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2020 12:34:56/));
  });
  $clock.tick(500);
});

test('cast YYYY-MM-DD hh:mm:ss', function() {
  $dom.countdown('2020-10-20 12:34:56').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2020 12:34:56/));
  });
  $clock.tick(500);
});

test('cast YYYY/MM/DD', function() {
  $dom.countdown('2020/10/20').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Oct 20 2020 00:00:00/));
  });
  $clock.tick(500);
});

test('cast MM/DD/YYYY', function() {
  $dom.countdown('11/22/2020').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Nov 22 2020 00:00:00/));
  });
  $clock.tick(500);
});

test('cast MM/DD/YYYY', function() {
  $dom.countdown('11/22/2020').on('update.countdown', function(event) {
    ok(event.finalDate.toString().match(/Nov 22 2020 00:00:00/));
  });
  $clock.tick(500);
});
