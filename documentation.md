---
layout:     content
title:      Documentation
toc:        anchors
toc-content:
    - Introduction
    - Events
    - Event object
    - Formatter
    - Controls
---

#### Requirements ####

Since version 2.0.0 we only support **jQuery**  above 1.7 (including 2.0). For legacy 1.6 support please use the version 1.0.1.

<a class="anchor" id="introduction"></a>

Introduction
--------------

For each DOM in your selector chain, an instance of the countdown will be created with an interval, that sends  signals (events) with the time remaining components has weeks, days, hours, so on so forth (for more details see [Event object](#event-object) section). The countdown is wrapped within the DOM and will auto delete itself when the DOM is removed.

```javascript
$('div#clock').countdown(finalDate[, callback]);
```

With the legacy approach you will need to handle all events in a single callback (update, finish or stop) through the `event.type` property, if you prefer an event orieted programming style, this plugin also support the default jQuery `on` method to register your callbacks.

```javascript
$('div#clock').countdown(finalDate)
    .on('update', callback)
    .on('finish', callback);
```

To start the countdown the only requirement is the `finalDate`, but you still need register a callback to manipulate/update the DOM.

#### Arguments

**finalDate**  
The target date that you are seeking to countdown. This argument can be one of the following:  

*   A native date object
*   The milliseconds
*   String formatted as following:
    -   `YYYY/MM/DD`
    -   `MM/DD/YYYY`
    -   `YYYY/MM/DD hh:mm:ss`
    -   `MM/DD/YYYY hh:mm:ss`

**callback**  
A function that will handle the `event` triggered, despite the fact we have three event types, all of them will have the same object properties (as described bellow), where you can access the offset calculation.

```javascript
function(event) { ... }
```

<a class="anchor" id="events"></a>

Events
------
  
This plugin will trigger an event whenever some state change like:

-   **Update**: Triggered to update the DOM
-   **Finish**: Triggered when finished
-   **Stop**:   Triggered that paused

To register a callback use the following `event.type`:

-   `update.countdown`
-   `finish.countdown`
-   `stop.countdown`

All events are namespaced with `*.countdown`, but you can avoid them.

<a class="anchor" id="event-object"></a>

Event object
------------

```javascript
{
    type:           '{String} The namespaced event type {update,finish,stop}.countdown',
    finalDate:      '{Date} The Date native object'
    offset: {
        seconds:    '{int} Seconds left for the next minute',
        minutes:    '{int} Minutes left for the next hour',
        hours:      '{int} Hours left until next day',
        days:       '{int} Days left until next week',
        totalDays:  '{int} Total amount of days left until final date',
        weeks:      '{int} Weeks left until the final date',
        months:     '{int} Months left until final date' ,
        years:      '{int} Year left until final date'
    },
    offsetDate:     '{Date} A native date with the offset value',
    strftime:       '{Function} A simple formatter function'
}
```

Most of the time you will be using the `event.strftime` function to render the countdown, the next section goes deeper in this subject.

<a class="anchor" id="formatter"></a>

Formatter <small>(event.strftime)</small>
-----------------------------------

A simple formatter that helps keep your code more semantic and avoid repetitive tasks. 

It formats the offset date according to the directives in the given format string. The directive consists of a percent (`%`) character. Any text not listed as a directive will be passed through to the output string.

All the short and long directives contains zero-padded (01, 02, 03, ..., 10) and blank-padded (1, 2, 3, ..., 10) versions, to use the latter please use the dash `-` modifier.

The formatter is also capable of handle pluralization through the bang `!` modifier, by default always return the `s` character, if you need a complex logic please read the **Pluralization** topic of this section.

<table class="table table-striped table-bordered table-nonfluid">
    <tr>
        <th>Modifier</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>-</code></td>
        <td>Blank padding</td>
    </tr>
    <tr>
        <td><code>!</code></td>
        <td>Pluralization plugin</td>
    </tr>
</table>

#### Directives ####

<table class="table table-striped table-bordered">
    <tr>
        <th>Long version</th>
        <th>Short version</th>
        <th>Blank-padded</th>
        <th>Description</th>
        
    </tr>
    <tr>
        <td><code>%years</code></td>
        <td><code>%Y</code></td>
        <td><code>%-Y</code></td>
        <td>Years left</td>
    </tr>
    <tr>
        <td><code>%months</code></td>
        <td><code>%m</code></td>
        <td><code>%-m</code></td>
        <td>Monts left</td>
    </tr>
    <tr>
        <td><code>%weeks</code></td>
        <td><code>%w</code></td>
        <td><code>%-w</code></td>
        <td>Weeks left</td>
    </tr>
    <tr>
        <td><code>%days</code></td>
        <td><code>%d</code></td>
        <td><code>%-d</code></td>
        <td>Days left</td>
    </tr>
    <tr>
        <td><code>%totalDays</code></td>
        <td><code>%D</code></td>
        <td><code>%-D</code></td>
        <td>Total amount of days left</td>
    </tr>
    <tr>
        <td><code>%hours</code></td>
        <td><code>%H</code></td>
        <td><code>%-H</code></td>
        <td>Hours left</td>
    </tr>
    <tr>
        <td><code>%minutes</code></td>
        <td><code>%M</code></td>
        <td><code>%-M</code></td>
        <td>Minutes left</td>
    </tr>
    <tr>
        <td><code>%seconds</code></td>
        <td><code>%S</code></td>
        <td><code>%-S</code></td>
        <td>Seconds left</td>
    </tr>
</table>

Bellow some use cases examples:

```javascript
event.strftime('%W weeks %-D days %-H h %M min %S sec'); // 1 week 2 days 3 h 04 min 05 sec
// Pluralization
event.strftime('%-D day%!D %H:%M:%S'); // 1 day 23:45:56 (or) 2 days 23:45:56
// Now in german
event.strftime('%-D tag%!D(e) %H:%M:%S'); // 1 tage 23:45:56 (or) 2 tag 23:45:56
```

#### Pluralization #####

*Coming soon...*


<a class="anchor" id="controls"></a>

Controls
--------

The plugin allow you to pause/resume the countdown anytime.

```javascript
// Pause the countdown
$('div#clock').countdown('pause');
$('div#clock').countdown('stop');
// Resume the countdown
$('div#clock').countdown('resume');
$('div#clock').countdown('start');
```