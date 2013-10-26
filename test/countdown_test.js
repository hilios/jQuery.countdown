QUnit.config.autostart = false;
(function( factory ) {
    if ( typeof define !== "undefined" && define.amd ) {
        require(['jquery', '../src/jquery.countdown'], function($) {
            factory($);
        });
    } else {
      factory(jQuery);
    }
})(function($) {
    QUnit.start();
    module('jQuery The Final Countdown');
    
    //Helpers
    var $dom;
    
    QUnit.testStart(function() {
        $dom = $('<div id="clock" />').appendTo('#qunit-fixture');
    });
    
    QUnit.testDone(function() {
        try { 
            $dom.countdown('remove');
        } catch(e){}
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
    
    asyncTest('event object has {currentDate, finalDate, offset} properties', 3, function() {
        $dom.countdown('2020/10/20').on('update.countdown', function(event) {
            ok(event.hasOwnProperty('currentDate'));
            ok(event.hasOwnProperty('finalDate'));
            ok(event.hasOwnProperty('offset'));
            start();
        });
    });
    
    asyncTest('event.offset object has {seconds, minutes, hours, days, weeks, fullDays} properties', 6, function() {
        $dom.countdown('2020/10/20').on('update.countdown', function(event) {
            ok(event.offset.hasOwnProperty('seconds'));
            ok(event.offset.hasOwnProperty('minutes'));
            ok(event.offset.hasOwnProperty('hours'));
            ok(event.offset.hasOwnProperty('days'));
            ok(event.offset.hasOwnProperty('weeks'));
            ok(event.offset.hasOwnProperty('fullDays'));
            start();
        });
    });
    
    asyncTest('allow the callback be setted uppon initialization', 1, function() {
        $dom.countdown('2020/10/20', function(event) {
            ok(true); // Up to this point the event was dispatched
            start();
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
    
    asyncTest('cast miliseconds as a string', 1, function() {
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
    
    asyncTest('cast MM/DD/YYYY hh:mm:ss', 1, function() {
        $dom.countdown('11/22/2020 12:34:56').on('update.countdown', function(event) {
            ok(event.finalDate.toString().match(/Nov 22 2020 12:34:56/));
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
});