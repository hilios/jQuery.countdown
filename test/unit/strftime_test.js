module('strftime');

test('strftime is a function that returns a string', function() {
  $dom.countdown('11/22/2020').on('update.countdown', function(event) {
    ok(typeof event.strftime === 'function');
    ok(typeof event.strftime('foo') === 'string');
  });
  $clock.tick(500);
});

test('strftime returns the same string if no replaces were made', function() {
  $dom.countdown('11/22/2020').on('update.countdown', function(event) {
    ok(event.strftime('Foo Bar') === 'Foo Bar');
  });
  $clock.tick(500);
});

test('escaping percentage character %% ', function() {
  $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
    ok(event.strftime('%%') === '%');
  });
  $clock.tick(500);
});

/*
| Directive     | Blank-padded  | Pluralization | Description               |
|---------------|---------------|---------------|---------------------------|
| %Y            | %-Y           | %!Y           | Years left                |
| %m            | %-m           | %!m           | Months left               |
| %n            | %-n           | %!n           | Days left to a month      |
| %w            | %-w           | %!w           | Weeks left                |
| %W            | %-W           | %!W           | Weeks left to a month     |
| %d            | %-d           | %!d           | Days left to a week       |
| %H            | %-H           | %!H           | Hours left                |
| %M            | %-M           | %!M           | Minutes left              |
| %S            | %-S           | %!S           | Seconds left              |
| %D            | %-D           | %!D           | Total amount of days left |
| %I            | %-I           | %!I           | Total hours left          |
| %N            | %-N           | %!N           | Total minutest left       |
| %T            | %-T           | %!T           | Total seconds left        |
|---------------------------------------------------------------------------|
*/

test('all directives', function() {
  $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
    ok(event.strftime('%Y %m %n %w %W %d %D %H %M %S %D %I %N %T')
      .match(/^([0-9]{1,}\s?){14}$/) !== null);
  });
  $clock.tick(500);
});

test('blank-padded directives', function() {
  $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
    ok(event.strftime('%-Y %-m %-n %-w %-W %-d %-H %-M %-S %-D %-I %-N %-T')
      .match(/^([0-9]{1,}\s?){14}$/) !== null);
  });
  $clock.tick(500);
});

test('return an empty character when plural', function() {
  $dom.countdown(new Date().valueOf() + 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 1);
    ok(event.strftime('%!S') === '');
  });
  $clock.tick(500);
});

test('return a `s` when when plural', function() {
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('%!S') === 's');
  });
  $clock.tick(500);
});

test('return the given character when plural', function() {
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('sekunde%!S:n;') === 'sekunden');
  });
  $clock.tick(500);
});

test('return the plural when given pair of arguments', function() {
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('%!S:day,days;') === 'days');
  });
  $clock.tick(500);
});

test('return the singular when given pair of arguments', function() {
  $dom.countdown(new Date().valueOf() + 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 1);
    ok(event.strftime('%!S:day,days;') === 'day');
  });
  $clock.tick(500);
});

test('return the singular for zero (issue #187)', function() {
  $dom.countdown(new Date().valueOf() + 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 1);
    ok(event.strftime('%m %!m:min,minutes;') === '00 min');
  });
  $clock.tick(500);
});

test('return the correct plural even with odd looking (issue #70)', function() {
  $dom.countdown(new Date().valueOf() + 2 * 60 * 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.minutes === 2);
    ok(event.strftime('%!M:Minuta,Minute(e);') === 'Minute(e)');
  });
  $clock.tick(500);
});
