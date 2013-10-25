The Final Countdown (v.2.0.0)
=============================
**A simple and html agnostic date countdown plugin for jQuery**

[The Final Countdown](http://www.youtube.com/watch?v=9jK-NcRmVcw) is a plugin tailored to be used in any layout, withou worring with CSS of HTML. One of the design requirements was to fit and mimic any popular countdown styles you see out there, like Groupon.

So take control of your DOM, register yours callbacks and start counting...

#### Requirements ####

Since version >= 2.0.0 we only support jQuery up to version 1.7, for legacy 1.6 support please use the v1.0.1 branch.

Usage
-----

Call the *countdown* function into the selector chain:

```javascript
$('div#clock').countdown(finalDate[, callback]);
```

### Legacy sample

The example bellow is the most simple usage of the plugin, under the [Documentation](#documentation) section you will find all about the `event` data object and comples examples to help achieve your goals. 

```html
<div id="clock">
    <span id="weeks"></span>      Weeks
    <span id="days"></span>       Days
    <span id="hours"></span>      Hours
    <span id="minutes"></span>    Minutes
    <span id="seconds"></span>    Seconds
</div>

<script type="text/javascript">
  $(function() {
    $('div#clock').countdown("2015/06/28", function(event) {
      var $this = $(this);
    });
  });
</script>
```
[Run this example](#)

Documentation
-------------

For each DOM in your selector chain, and instance of the countdown will be created, with an interval that sends  signals (events) with all time remaining components has weeks, days, hours, so on so forth. The countdown will be wrapped within the DOM and will auto remove itself when the DOM is excluded.

```javascript
$('div#clock').countdown(finalDate[, callback]);
```

With the legacy approach you will need to handle all events in a single callback (update, finish or stop) through the `event.type` property. If you preffer an event orieted programming style, this plugin also support the `on` method to register your callbacks.

```javascript
$('div#clock').countdown(finalDate)
    .on('update', callback)
    .on('finish', callback);
```
The only requirement to start the plugin is the `finalDate`, but you will need register a callback to update your DOM.

### Arguments

**finalDate**  
The target date that you are seeking to countdown. This argument can be one of the following:  

*   A native date object
*   The milliseconds
*   String formatted as following:
    -   *YYYY/MM/DD*
    -   *MM/DD/YYYY*
    -   *YYYY/MM/DD hh:mm:ss.sss*
    -   *YYYY/MM/DD hh:mm:ss*
    -   *MM/DD/YYYY hh:mm:ss*

**callback**  

A function that will handle the `event`, despite the fact we have three event types, all of them will have the same object properties (described bellow), where you can access the offset calculation.

```javascript
function(event) { ... }
```

### Events
  
This plugin will trigger an event whenever some state change like:
-   **Update**: Every time we need to update the DOM
-   **Finish**: Inform when was finished
-   **Stop**:   Inform that was paused

To register a callback use the following *event.type*:
-   `update.countdown`
-   `finish.countdown`
-   `stop.countdown`

All events are namespaced with `*.countdown`, but you can avoid them.

```javascript
{
    type:           '{String} The namespaced event type {update,finish,stop}.countdown',
    finalDate:      '{Date} The Date native object'
    offset: {
        seconds:    '{int} The remaining seconds for the next minute',
        minutes:    '{int} The remaining minutes for the next hour',
        hours:      '{int} The reamining hours for the next day',
        days:       '{int} The remaining days for the week',
        weeks:      '{int} The remaining weeks to the final date',
        fullDays:   '{int} The remaining day to the final date'
    },
    offsetDate:     '{Date} A native date with the offset value'
}
```

The most important property is the *event.offset*, there you will find the information that you want do display to your end user.

Examples
--------

Please see our examples bellow to see wich on fits your scenario, and if anyone does it's a good starting point to a advanced usage of the script.

-   [Coupon site with format hr:min:sec](#)
-   [Coupon site with format N days hr:min:sec](#)
-   [Coupon site with format N days hr:min:sec](#)
-   [Groupon Getaways](#)
-   [Multiple countdown on the same page](#)

Contributing
------------

The Final Countdown uses Grunt with convenient methods for working with the plugin. It's how we compile our code and run tests. To use it, install the required dependencies as directed and then run some Grunt commands.

```shell
npm install
grunt test  # Lint code and run unit test
grunt build # Generate the min version
grunt       # Watch for updates than test and build
```

This plugin is tested with [QUnit](http://qunitjs.com/), under jQuery 1.7.2 up to 2.0.3, Bootstrap 3.0 and RequireJS 2.1.9.

The functional tests were made against:

*   Chrome >= 12
*   Safari >= 5
*   Firefox >= 5.0
*   IE 7/8/9

License
-------

Copyright (c) 20011 Edson Hilios. This is a free software is licensed under the MIT License.

*   [Edson Hilios](http://edson.hilios.com.br). Mail me: edson (at) hilios (dot) com (dot) br