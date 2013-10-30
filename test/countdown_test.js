module('jQuery The Final Countdown');

// Helpers
var $dom;

QUnit.testStart(function() {
    $dom = $('<div id="clock" />').appendTo('body');
});

QUnit.testDone(function() {
    try{
        $dom.countdown('remove');
    } catch(e) {
        $dom.remove();
    }
});

module('Sanity tests');

test('ensure DOM for testing is created', function() {
    var node = document.getElementById($dom.attr('id'));
    ok(node !== null);
    ok(node !== undefined);
    ok($dom.length === 1);
});

test('countdown method exists within jquery selector', function() {
    ok($.fn.countdown !== undefined);
    ok($.fn.countdown !== null);
    ok($.fn.countdown);
});

test('throws an error when initiated with wrong number of arguments', function() {
    throws(function() {
        $('<div />').countdown();
    });
});

module('Events');

asyncTest('trigger the update event', 1, function() {
    $dom.countdown('2020/10/20').on('update.countdown', function(event) {
        ok(true); // Up to this point the event was dispatched
        start();
    });
});

asyncTest('trigger the finish event', 1, function() {
    $dom.countdown('2010/10/20').on('finish.countdown', function(event) {
        ok(true); // Up to this point the event was dispatched
        start();
    });
});

asyncTest('event object has {finalDate, offset, offsetDate, strftime} properties', function() {
    expect(4);

    $dom.countdown('2020/10/20').on('update.countdown', function(event) {
        ok(event.hasOwnProperty('finalDate'));
        ok(event.hasOwnProperty('offset'));
        ok(event.hasOwnProperty('offsetDate'));
        ok(event.hasOwnProperty('strftime'));
        start();
    });
});

asyncTest('event.offset object has {seconds, minutes, hours, days, totalDays, weeks, years} properties', function() {
    expect(7);

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

test('allow the callback be setted uppon initialization (legacy style)', function() {
    $dom.countdown('2020/10/20', function(event) {
        ok(true); // Up to this point the event was dispatched
    });
});

module('Commands and functionality');

asyncTest('stop/start the countdown', 2, function() {
    var callback = sinon.spy();
    $dom.countdown('2020/10/20').on('update.countdown', callback);
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

asyncTest('pause/resume the countdown', 2, function() {
    var callback = sinon.spy();
    $dom.countdown('2020/10/20').on('update.countdown', callback);
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

asyncTest('remove the countdown instance', 1, function() {
    var callback = sinon.spy();
    $dom.countdown('2020/10/20').on('update.countdown', callback);
    $dom.countdown('remove');
    // See if noting was executed after 0.5 sec
    setTimeout(function() {
        ok(callback.callCount === 0);
        start();
    }, 500);
});

asyncTest('remove the countdown if dom was removed', 1, function() {
    var callback = sinon.spy();
    $dom.countdown('2020/10/20').on('update.countdown', callback);
    $dom.remove();
    // See if noting was executed after 0.5 sec
    setTimeout(function() {
        ok(callback.callCount === 0);
        start();
    }, 500);
});

asyncTest('set a new finalDate by calling the countdown with a new date', 1, function() {
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

test('throw an error when try to start a countdown that isalready running', function() {
    $dom.countdown('2020/10/20');
    throws(function() {
        $dom.countdown('start');
    });
});

module('Date manipulation');

test('throw an error when string cannot be parsed', function() {
    throws(function() {
        $dom.countdown('Foo Bar!');
    });
});

asyncTest('accept a native Date object', 1, function() {
    // Remember that the month starts at zero 0
    var date = new Date(2020, 7, 8, 9, 10, 11);
    $dom.countdown(date).on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Aug 08 2020 09:10:11/));
        start();
    });
});

asyncTest('cast miliseconds as a string (Bug report @msigley pull-request #17)', 1, function() {
    // Remember that the month starts at zero 0
    var ms = new Date(2020, 8, 9, 10, 11, 12).getTime();
    $dom.countdown(String(ms)).on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Sep 09 2020 10:11:12/));
        start();
    });
});

asyncTest('cast miliseconds as a number', 1, function() {
    // Remember that the month starts at zero 0
    var ms = new Date(2020, 8, 9, 10, 11, 12).getTime();
    $dom.countdown(Number(ms)).on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Sep 09 2020 10:11:12/));
        start();
    });
});

asyncTest('cast YYYY/MM/DD hh:mm:ss', 1, function() {
    $dom.countdown('2020/10/20 12:34:56').on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Oct 20 2020 12:34:56/));
        start();
    });
});

asyncTest('cast YYYY/MM/DD', 1, function() {
    $dom.countdown('2020/10/20').on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Oct 20 2020 00:00:00/));
        start();
    });
});

asyncTest('cast MM/DD/YYYY', 1, function() {
    $dom.countdown('11/22/2020').on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Nov 22 2020 00:00:00/));
        start();
    });
});

asyncTest('cast MM/DD/YYYY', 1, function() {
    $dom.countdown('11/22/2020').on('update.countdown', function(event) {
        ok(event.finalDate.toString().match(/Nov 22 2020 00:00:00/));
        start();
    });
});

module('strftime');

asyncTest('strftime is a function that returns a string', 2, function() {
    $dom.countdown('11/22/2020').on('update.countdown', function(event) {
        ok(typeof event.strftime === 'function');
        ok(typeof event.strftime('foo') === 'string');
        start();
    });
});

asyncTest('strftime returns the same string if no replaces were made', 1, function() {
    $dom.countdown('11/22/2020').on('update.countdown', function(event) {
        ok(event.strftime('Foo Bar') === 'Foo Bar');
        start();
    });
});

asyncTest('escaping percentage character %% ', 1, function() {
    $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
        ok(event.strftime('%%') === '%');
        start();
    });
});

/*
%Y  %-Y     %years      Years left
%m  %-m     %months     Monts left
%w  %-w     %weeks      Weeks left
%d  %-d     %days       Days left
%D  %-D     %totalDays  Total amount of days left
%H  %-H     %hours      Hours left
%M  %-M     %minutes    Minutes left
%S  %-S     %seconds    Seconds left
*/

asyncTest('long-version directives', 1, function() {
    $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
        ok(event.strftime('%years %months %weeks %days %totalDays %hours %minutes %seconds')
            .match(/^([0-9]{1,}\s?){8}$/) !== null);
        start();
    });
});

asyncTest('short-version directives', 1, function() {
    $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
        ok(event.strftime('%Y %m %w %d %D %H %M %S')
            .match(/^([0-9]{1,}\s?){8}$/) !== null);
        start();
    });
});

asyncTest('short-version blank-padded directives', 1, function() {
    $dom.countdown('2020/11/10 09:08:07').on('update.countdown', function(event) {
        ok(event.strftime('%-Y %-m %-w %-d %-D %-H %-M %-S')
            .match(/^([0-9]{1,}\s?){8}$/) !== null);
        start();
    });
});

asyncTest('return an empty character when plural', 2, function() {
    $dom.countdown(new Date().valueOf() + 1000).on('update.countdown', function(event) {
        ok(event.offset.seconds === 1);
        ok(event.strftime('%!S') === '');
        start();
    });
});

asyncTest('return an `s` when when plural', 2, function() {
    $dom.countdown(new Date().valueOf() + 2000).on('update.countdown', function(event) {
        ok(event.offset.seconds === 2);
        ok(event.strftime('%!S') === 's');
        start();
    });
});

asyncTest('return the given character when plural', 2, function() {
    $dom.countdown(new Date().valueOf() + 2000).on('update.countdown', function(event) {
        ok(event.offset.seconds === 2);
        ok(event.strftime('sekunde%!S<n>') === 'sekunden');
        start();
    });
});

asyncTest('return the plural when given pair of arguments', 2, function() {
    $dom.countdown(new Date().valueOf() + 2000).on('update.countdown', function(event) {
        ok(event.offset.seconds === 2);
        ok(event.strftime('%!S<day,days>') === 'days');
        start();
    });
});

asyncTest('return the singular when given pair of arguments', 2, function() {
    $dom.countdown(new Date().valueOf() + 1000).on('update.countdown', function(event) {
        ok(event.offset.seconds === 1);
        ok(event.strftime('%!S<day,days>') === 'day');
        start();
    });
});