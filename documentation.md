---
layout:     content
title:      Documentation
submenu:
    - Introduction
    - Events
    - Event object
    - Controls
---

#### Requirements ####

Since version 2.0.0 we only support jQuery up to version 1.7, for legacy 1.6 support please use the version 1.0.1.

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
    -   *YYYY/MM/DD*
    -   *MM/DD/YYYY*
    -   *YYYY/MM/DD hh:mm:ss.sss*
    -   *YYYY/MM/DD hh:mm:ss*
    -   *MM/DD/YYYY hh:mm:ss*

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

To register a callback use the following *event.type*:

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

The most important property is the **event.offset**, there you will find the information that you want do display to your end user.

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