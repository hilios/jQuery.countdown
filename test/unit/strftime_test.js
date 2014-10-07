module('strftime');

test('strftime is a function that returns a string', function() {
  stop();
  $dom.countdown('11/22/2020')
  .on('update.countdown', function(event) {
    ok(typeof event.strftime === 'function');
    ok(typeof event.strftime('foo') === 'string');
    start();
  });
});

test('strftime returns the same string if no replaces were made', function() {
  stop();
  $dom.countdown('11/22/2020')
  .on('update.countdown', function(event) {
    ok(event.strftime('Foo Bar') === 'Foo Bar');
    start();
  });
});

test('escaping percentage character %% ', function() {
  stop();
  $dom.countdown('2020/11/10 09:08:07')
  .on('update.countdown', function(event) {
    ok(event.strftime('%%') === '%');
    start();
  });
});

/*
| Directive     | Blank-padded  | Pluralization | Description               |
|---------------|---------------|---------------|---------------------------|
| %Y            | %-Y           | %!Y           | Years left                |
| %m            | %-m           | %!m           | Months left               |
| %w            | %-w           | %!w           | Weeks left                |
| %d            | %-d           | %!d           | Days left                 |
| %D            | %-D           | %!D           | Total amount of days left |
| %H            | %-H           | %!H           | Hours left                |
| %M            | %-M           | %!M           | Minutes left              |
| %S            | %-S           | %!S           | Seconds left              |
|---------------------------------------------------------------------------|
*/

test('all directives', function() {
  stop();
  $dom.countdown('2020/11/10 09:08:07')
  .on('update.countdown', function(event) {
    ok(event.strftime('%Y %m %w %d %D %H %M %S')
      .match(/^([0-9]{1,}\s?){8}$/) !== null);
    start();
  });
});

test('blank-padded directives', function() {
  stop();
  $dom.countdown('2020/11/10 09:08:07')
  .on('update.countdown', function(event) {
    ok(event.strftime('%-Y %-m %-w %-d %-D %-H %-M %-S')
      .match(/^([0-9]{1,}\s?){8}$/) !== null);
    start();
  });
});

test('return an empty character when plural', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 1);
    ok(event.strftime('%!S') === '');
    start();
  });
});

test('return a `s` when when plural', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('%!S') === 's');
    start();
  });
});

test('return the given character when plural', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('sekunde%!S:n;') === 'sekunden');
    start();
  });
});

test('return the plural when given pair of arguments', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 2000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 2);
    ok(event.strftime('%!S:day,days;') === 'days');
    start();
  });
});

test('return the singular when given pair of arguments', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.seconds === 1);
    ok(event.strftime('%!S:day,days;') === 'day');
    start();
  });
});

test('return the correct plural even with odd looking (issue #70)', function() {
  stop();
  $dom.countdown(new Date().valueOf() + 2 * 60 * 1000)
  .on('update.countdown', function(event) {
    ok(event.offset.minutes === 2);
    ok(event.strftime('%!M:Minuta,Minute(e);') === 'Minute(e)');
    start();
  });
});
