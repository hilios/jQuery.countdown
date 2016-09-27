---
layout: content
title: Documentation
category: docs
toc:
  - Install
  - Introduction
  - Events
  - Event object
  - Formatter
  - Controls
published: true
---

Install <a id="install"></a>
-------

We provide two installation methods:

#### Bower ####

```
bower install jquery.countdown
```

#### Manual ####

Download the files and add a `script` to your html:

```html
<script src="/bower_components/jquery.countdown/dist/jquery.countdown.js"></script>
```

#### Requirements ####

The latest versions supports **jQuery**  from 1.7 up to >= 2.1. For legacy support (<= 1.6) please use the version [1.0.2](https://github.com/hilios/jQuery.countdown/releases/download/1.0.2/jquery.countdown-1.0.2.zip).

Introduction <a id="introduction"></a>
------------

For each DOM in your selector chain, an instance of the countdown will be created with an interval, that sends  signals (events) with the time remaining components has weeks, days, hours, so on so forth (for more details see [Event object](#event-object) section). The countdown is wrapped within the DOM and will auto delete itself when the DOM is removed.

```javascript
$('div#clock').countdown(finalDate[, callback]);
```

With the legacy approach you will need to handle all events in a single callback (update, finish or stop) through the `event.type` property, if you prefer an event orieted programming style, this plugin also support the default jQuery `on` method to register your callbacks.

```javascript
$('div#clock').countdown(finalDate)
    .on('update.countdown', callback)
    .on('finish.countdown', callback);
```

To start the countdown the only requirement is the `finalDate`, but you still need register a callback to manipulate/update the DOM.

#### Arguments

**finalDate**

The target date that you are seeking to countdown. This argument can be one of the following:

 * A native date object
 * The milliseconds from Epoch time
 * String formatted as following:
   - `YYYY/MM/DD`
   - `MM/DD/YYYY`
   - `YYYY/MM/DD hh:mm:ss`
   - `MM/DD/YYYY hh:mm:ss`

**callback**

A function that will handle the `event` triggered, despite the fact we have three event types, all of them will have the same object properties (as described bellow), where you can access the offset calculation.

```javascript
function(event) { ... }
```

#### Configuration object

The plugin accepts some configuration passing by an object has the function second argument. This way one can control the precision the plugin will have and allow customizations:

```javascript
$('div#clock').countdown(finalDate, {
  elapse:     '{bool} Allow to continue after finishes',
  precision:  '{int} The update rate in milliseconds',
  defer:      '{bool} Deferred initialization mode'
})
```

The configuration mode is only available with the new style of initialization.

### Elapse mode

The elapse mode allows the plugin to continue counting even after reaches its finish. One can control the render within the callback using the `event.elapsed` property.

```javascript
$('div#clock').countdown(finalDate, {elapse: true})
  .on('update.countdown', function(event) {
    if (event.elapsed) { // Either true or false
      // Counting up...
    } else {
      // Countdown...
    }
  });
```

**Be aware** that no `finish` event will be dispatched at this mode!

### Deferred initialization

The deferred initialization mode allows you to register the callback before the countdown actually starts, this is useful when one wants to render the proper HTML the exact time the countdown starts, (i.e. when the countdown are really short time <= 60s).

Just be aware that the developer **MUST** call the `start` method manually to begin the countdown:

```javascript
// It will render correctly since the start of the plugin.
$('div#clock').countdown(finalDate, {defer: })
  .on('update.countdown', function() {
    // render something
  })
  .countdown('start');
```

Events <a id="events"></a>
------

This plugin will trigger an event whenever some state change like:

 - **Update**: Triggered to update the DOM
 - **Finish**: Triggered when finished
 - **Stop**:   Triggered that paused

To register a callback use the following `event.type`:

-   `update.countdown`
-   `finish.countdown`
-   `stop.countdown`

Be aware that **ALL** events should be registered with the namespace `*.countdown`.

Event object <a id="event-object"></a>
------------

Most of the time you will be using the `event.strftime` function to render the countdown, the next section goes deeper in this subject. But you can access all raw values:

```javascript
{
    type:           '{String} The namespaced event type {update,finish,stop}.countdown',
    strftime:       '{Function} The formatter function',
    finalDate:      '{Date} The parsed final date native object',
    elapsed:        '{bool} Passed away the final date?',
    offset: {
        seconds     : '{int} Seconds left for the next minute',
        minutes     : '{int} Minutes left for the next hour',
        hours       : '{int} Hours left until next day',
        days        : '{int} Days left until next week',
        daysToWeek  : '{int} Days left until next week',
        daysToMonth : '{int} Days left until next month',
        weeks       : '{int} Weeks left until the final date',
        weeksToMonth: '{int} Weeks left until the next month',
        months      : '{int} Months left until final date',
        years       : '{int} Years left until final date',
        totalDays   : '{int} Total amount of days left until final date',
        totalHours  : '{int} Total amount of hours left until final date',
        totalMinutes: '{int} Total amount of minutes left until final date',
        totalSeconds: '{int} Total amount of seconds left until final date'
    }
}
```

Formatter <small>(event.strftime)</small> <a id="formatter"></a>
---------

A simple formatter that helps keep your code more semantic and avoid repetitive tasks.

It formats the offset date according to the directives in the given format string. The directive consists of a percent (`%`) character. Any text not listed as a directive will be passed through to the output string.

```javascript
event.strftime('%W weeks %-d days %-H h %M min %S sec');
// => 1 week 2 days 3 h 04 min 05 sec
```

All the directives contains zero-padded (01, 02, 03, ..., 10) and blank-padded (1, 2, 3, ..., 10) versions, to use the latter please use the dash `-` modifier.

The formatter is also capable of handle pluralization through the bang `!` modifier, by default always return the `s` character, if you need a complex logic please read the **Pluralization** topic of this section.

<table class="pure-table pure-table-horizontal">
  <thead>
    <tr>
      <th>Modifier</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>-</code></td>
      <td>Blank padding</td>
    </tr>
    <tr>
      <td><code>!</code></td>
      <td>Pluralization plugin</td>
    </tr>
  </tbody>
</table>

#### Directives ####

<table class="pure-table pure-table-horizontal">
  <thead>
    <tr>
      <th>Directive</th>
      <th>Blank-padded</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>%Y</code></td>
      <td><code>%-Y</code></td>
      <td>Years left *</td>
    </tr>
    <tr>
      <td><code>%m</code></td>
      <td><code>%-m</code></td>
      <td>Months left *</td>
    </tr>
    <tr>
      <td><code>%n</code></td>
      <td><code>%-n</code></td>
      <td>Days left until the next complete month *</td>
    </tr>
    <tr>
      <td><code>%w</code></td>
      <td><code>%-w</code></td>
      <td>Weeks left</td>
    </tr>
    <tr>
      <td><code>%W</code></td>
      <td><code>%-W</code></td>
      <td>Weeks left until the next complete month *</td>
    </tr>
    <tr>
      <td><code>%d</code></td>
      <td><code>%-d</code></td>
      <td>Days left (taking away weeks)</td>
    </tr>
    <tr>
      <td><code>%H</code></td>
      <td><code>%-H</code></td>
      <td>Hours left</td>
    </tr>
    <tr>
      <td><code>%M</code></td>
      <td><code>%-M</code></td>
      <td>Minutes left</td>
    </tr>
    <tr>
      <td><code>%S</code></td>
      <td><code>%-S</code></td>
      <td>Seconds left</td>
    </tr>
  </tbody>
</table>
<small class="text-center">* Due to their non linear constrains the calculation does not have precision and it's pretending to be used as a approximation or not use at all.</small>

There are another set of directives that returns the full count of the time component till the end of the countdown:

<table class="pure-table pure-table-horizontal">
  <thead>
    <tr>
      <th>Directive</th>
      <th>Blank-padded</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>%D</code></td>
      <td><code>%-D</code></td>
      <td>Total count of days till the end</td>
    </tr>
    <tr>
      <td><code>%I</code></td>
      <td><code>%-I</code></td>
      <td>Total count of hours thill the end</td>
    </tr>
    <tr>
      <td><code>%N</code></td>
      <td><code>%-N</code></td>
      <td>Total count of minutes till the end</td>
    </tr>
    <tr>
      <td><code>%T</code></td>
      <td><code>%-T</code></td>
      <td>Total count of seconds till the end</td>
    </tr>
  </tbody>
</table>


#### Pluralization #####

The support for pluralization is built in the formatter by adding the `!` (bang) modifier to the directive, the default behavior is to return the **s** character, it's also possible to customize the return using the suffix `:...;`.

The table bellow show the supported use cases of the pluralization plugin.

<table class="pure-table pure-table-horizontal">
  <thead>
    <tr>
      <th>Directive</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>%!H</code></td>
      <td>Return <strong>s</strong> when the hour is different than 1</td>
    </tr>
    <tr>
      <td><code>%!S:plural;</code></td>
      <td>Return <strong>plural</strong> when seconds if different than 1</td>
    </tr>
    <tr>
      <td><code>%!d:singular,plural;</code></td>
      <td>Return <strong>singular</strong> when day is 1 and <strong>plural</strong> otherwise</td>
    </tr>
  </tbody>
</table>


```javascript
event.strftime('%-D day%!D %H:%M:%S');
// => 1 day 23:45:56 (or) 2 days 23:45:56

// Now in german
event.strftime('%-D tag%!D:e; %H:%M:%S');
// => 1 tag 23:45:56 (or) 2 tage 23:45:56
event.strftime('%S %!S:sekunde,sekunden;');
// => 01 sekunde (or) 02 sekunden
```

Controls <a id="controls"></a>
--------

The methods `pause`/`resume` allows to control the execution flow of the countdown:

```javascript
// Pause the countdown
$('div#clock').countdown('pause');
// Resume the countdown
$('div#clock').countdown('resume');
```

There also the aliases `stop`/`start` for the same functionality:

```javascript
// Pause the countdown
$('div#clock').countdown('stop');
// Resume the countdown
$('div#clock').countdown('start');
```

To set a new final date for the countdown, call the plugin initialization function with a valid date string:

```javascript
$('div#clock').countdown('2010/10/10');
// Then ...
$('div#clock').countdown('2012/20/20 12:34:56');
```
