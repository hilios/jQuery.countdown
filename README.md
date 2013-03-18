The Final Countdown
===================
**A really simple and abstract date countdown plugin for jQuery**

jQuery plugins should solve our code needs without any layout dependency, simply because you really don't know until the time the HTML file is ready the tags that will be used to make the layout sweet.

[The Final Countdown](http://www.youtube.com/watch?v=9jK-NcRmVcw) is plugin that let's you in control where and how you will display the countdown, this mean that the plugin doesn't make any assumption on how the html will be displayed and it's up to you to do it, with the help of our beloved jQuery selectors.

Usage
-----

Just call the *countdown* function in the selector chain:

```javascript
$('div#clock').countdown(toDate, callback);
```

Bellow we have some samples and the complete documentation of the functions arguments.

### Sample script

```javascript
$(function() {
  $('div#clock').countdown("2015/06/28", function(event) {
    var $this = $(this);
    switch(event.type) {
      case "seconds":
      case "minutes":
      case "hours":
      case "days":
      case "weeks":
      case "daysLeft":
        $this.find('span#'+event.type).html(event.value);
        break;
      case "finished":
        $this.hide();
        break;
    }
  });
});
```

### HTML Sample

```html
<div id="clock">
  <span id="weeks"></span>      Weeks
  <span id="daysLeft"></span>   Days
  <span id="hours"></span>      Hours
  <span id="minutes"></span>    Minutes
  <span id="seconds"></span>    Seconds
</div>
```

[Run this example](http://static.hilios.com.br/jquery-countdown/examples/basic.html)

Documentation
-------------

This script it's wrapper on an interval that calculates the time left, and execute a callback function every time something changes (this means every second).

**toDate**  
The target date that you are seeking to countdown. This attribute can be:  

*   Date object
*   Milliseconds
*   String formatted as following:
    -  *YYYY/MM/DD*
    -  *MM/DD/YYYY*
    -  *YYYY/MM/DD hh:mm:ss*
    -  *MM/DD/YYYY hh:mm:ss*

**callback**  
A function that will be the event handler, called every time any value on the countdown changes, sends an event object as argument.

```javascript
function(event) { ... }
```
  
The event has the following properties:

*event.type*  
A string with the name of the updated value, these are:

*   **seconds**  
    Called whenever the seconds changes.
*   **minutes**  
    Called whenever the minutes changes.
*   **hours**  
    Called whenever the hour changes.
*   **days**  
    Called whenever the day changes.
*   **weeks**  
    Called whenever the week changes.
*   **daysLeft**   
    Called whenever the week changes, this propertie is the how much days are left beside the weeks.  
    Mathematically speaking: *daysLeft = days - weeks * 7*.
*   **finished**  
    Called whenever the countdown finishs.

*event.value*  
A string with the number of the propertie that is left with two digits format for hours, minutes and seconds.

*event.date*  
A date object with the current date countdown.

*event.toDate*  
A Date object created by the first argument sent do the callback plugin.

*event.lasting*  
An object that contains all the offset calculations until the final date as numbers. This object has the same properties name has the event types: 

```
{seconds, minutes, hours, days, weeks, daysLeft}
```

Advanced usage
--------------

Below we build a sample how to adapt the countdown plugin for the coupons sites countdown format (hr:min:sec):

```html
<script type="text/javascript" charset="utf-8">
// Javascript
$(function() {
  $('div#clock').countdown(new Date(2015, 6, 28), function(event) {
    // Update every second
    if(event.type != "seconds") return;
    // Calculate the time left
    var timeLeft = [
      event.lasting.hours + event.lasting.days * 24,
      event.lasting.minutes,
      event.lasting.seconds
    ];
    // Convert the values to two digits strings
    for(var i = 0; i < timeLeft.length; ++i) {
      timeLeft[i] = (timeLeft[i] < 10 ? '0' : '') + timeLeft[i].toString();
    }
    // Concatenate the array and display at the tag
    $(this).html(timeLeft.join(':'));
  });
});
</script>
<!-- HTML -->
<div id="clock"></div>
```

[Run this example](http://static.hilios.com.br/jquery-countdown/examples/coupons.html)

Now an example how [Groupon Getaways](http://www.groupon.com/getaways) does the countdown on his site (N days hr:min:sec):

```html
<script type="text/javascript" charset="utf-8">
// Javascript
$(function() {
  var d, h, m, s;
  $('div#clock').countdown(new Date(2015, 6, 28), function(event) {
    var timeFormat = "%d day(s) %h:%m:%s",
        $this = $(this);
    switch(event.type) {
      case "days":
        d = event.value;
        break;
      case "hours":
        h = event.value;
        break;
      case "minutes":
        m = event.value;
        break;
      case "seconds":
        s = event.value;
        break;
      case "finished":
        $this.fadeTo('slow', 0.5);
        break;
    }
    // Assemble time format
    if(d > 0) {
      timeFormat = timeFormat.replace(/\%d/, d);
      timeFormat = timeFormat.replace(/\(s\)/, Number(d) == 1 ? '' : 's');
    } else {
      timeFormat = timeFormat.replace(/\%d day\(s\)/, '');
    }
    timeFormat = timeFormat.replace(/\%h/, h);
    timeFormat = timeFormat.replace(/\%m/, m);
    timeFormat = timeFormat.replace(/\%s/, s);
    // Display
    $this.html(timeFormat);
  });
});
</script>
<!-- HTML -->
<div id="clock"></div>
```

[Run this example](http://static.hilios.com.br/jquery-countdown/examples/groupon.html)

**Need multiple countdowns on the same page?**   
No problem at all [run this example](http://static.hilios.com.br/jquery-countdown/examples/multiple_clocks.html) and see at work.

Testing
-------

This plugin was tested with [Jasmine BDD Framework](http://pivotal.github.com/jasmine/). To test yourself just open the spec/SpecRuner.html on your favorite web browser, it take ~71.03s.

The script was tested against:

*   Chrome 12.0.742.122
*   Safari 5.0.5
*   Firefox 5.0
*   IE 6/7/8/9

Credits
-------

*   [Edson Hilios](http://edson.hilios.com.br) Mail me: edson (at) hilios (dot) com (dot) br

License
-------

Copyright (c) 20011 Edson Hilios. This is a free software is licensed under the MIT License.
