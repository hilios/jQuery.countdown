The Final Countdown
===================
**A really simple and abstract date countdown plugin for jQuery**

jQuery plugins should solve our code needs without any layout dependency, simply because you really don't know until the time the HTML file is ready the tags that will be used to make the layout sweet.

[The Final Countdown](http://www.youtube.com/watch?v=9jK-NcRmVcw) is plugin that let's you in control where and how you will display the countdown, this mean that the plugin doesn't make any assumption on how the html will be displayed and it's up to you to do it, with the help of your beloved jQuery selectors.

Usage
-----

Just attach the *countdown* function in the selector chain:

	$('div#clock').countdown(toDate, callback);

Bellow we have some samples for the plugin arguments.

### Sample script

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

### HTML Sample

```
    <div id="clock">
        <span id="weeks"></span>      Weeks
        <span id="daysLeft"></span>   Days
        <span id="hours"></span>      Hours
        <span id="minutes"></span>    Minutes
        <span id="seconds"></span>    Seconds
    </div>
```

Documentation
-------------

This script it's a basic interval called every second that execute a callback function.

**toDate**

The target date that you are seeking to countdown. This attribute can be:

*   Date object
*   Milliseconds
*   String formatted as following:
    -  *"YYYY-MM-DD"*
    -  *"YYYY/MM/DD"*
    -  *"MM/DD/YYYY"*
    -  *"YYYY-MM-DD hh:mm:ss"*
    -  *"YYYY/MM/DD hh:mm:ss"*
    -  *"MM/DD/YYYY hh:mm:ss"*

**callback**

A function that will be the event handler, called every time any value on the countdown changes, sends an event object as argument.

    function(event) { ... }
  
The event has the following properties:

*event.type*

*   **seconds:** Called whenever the seconds changes.
*   **minutes:** Called whenever the minutes changes.
*   **hours:** Called whenever the hour changes.
*   **days:** Called whenever the day changes.
*   **weeks:** Called whenever the week changes.
*   **daysLeft:** Called whenever the week changes, this propertie is the how much days are left beside the weeks. Mathematically speaking: *daysLeft = days - weeks * 7*.
*   **finished:** Called whenever the countdown finishs.

*event.value*

An string with the number of the propertie that is left with two digits format for hours, minutes and seconds.

*event.date*

A date object with the current date countdown.

*event.toDate*

A Date object created by the first argument sent do the callback plugin.

*event.lasting*

An object that contains all the offset calculations until the final date as numbers. This object has the same properties name has the event types: 

    {seconds, minutes, hours, days, weeks, daysLeft}

Advanced usage
--------------

A sample how adapt the countdown plugin for the popular coupons sites:
  
    $(function() {
        $('div#clock').countdown(new Date(2015, 6, 28), function(event) {
            // Update every second one time only
            if(event.type != "seconds") return;
            // Calculate the time left
            var timeLeft = [
                event.lasting.hours + event.lasting.days * 24,
                event.lasting.minutes,
                event.lasting.seconds
            ];
            // Convert the number to two digits strings
            for(var i = 0; i < timeLeft.length; ++i) {
                timeLeft[i] = (timeLeft[i] < 10 ? '0' + : '') + timeLeft[i].toString();
            }
            // Concatenate the strings with : and update the html
            $(this).html(timeLeft.join(':'));
        });
    });

    <div id="clock"></div>

Testing
-------

This plugin is tested with [Jasmine BDD Framework](http://pivotal.github.com/jasmine/).

Currently was tested against:

*   Chrome 12.0.742.122
*   Safari 5.0.5
*   Firefox 5.0

Credits
-------

*   [Edson Hilios](http://edson.hilios.com.br) edson (at) hilios (dot) com

License
-------

Copyright (c) 20011 Edson Hilios. This is a free software is licensed under the MIT License.