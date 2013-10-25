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