---
layout: content
title:  Timezone Aware
category: examples
---

Use **MomentJS** to display a countdown accordingly to the selected timezone no matter the localtime your computer is.

<div class="example-base">
  <div class="header">
    Next year from timezone: <br>
    <select id="timezone"></select> <br>
  </div>
  <span id="clock"></span>
  <small id="iso"></small>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment-with-locales.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone-with-data-2010-2020.min.js"></script>

<script type="text/javascript">
  // Handle timezone issue
  var $select = $('#timezone');
  var timezone = 'UTC';
  // Populate the timezone dropdown
  $.each(moment.tz.names(), function(i, value) {
    $select.append('<option value="%s">%s</option'.replace(/%s/g, value));
  });
  // Select the UTC
  $select.find('option[value="UTC"]').prop('selected', true);
  $select.change(function(event) {
    timezone = $(event.target).val();
    updateCountdown()
  });

  // Now the easy part, handle the countdown!
  var $clock = $('#clock');
  var $iso = $('#iso');
  $clock.on('update.countdown', function(event) {
    $(this).html(event.strftime('%D days %H:%M:%S'));
  });

  function updateCountdown() {
    var nextYear = new Date().getFullYear() + 1;
    var date = moment.tz("%Y-01-01 00:00".replace("%Y", nextYear), timezone);
    $clock.countdown(date.toDate());
    console.log(date.toISOString());
    $iso.html(date.format("YYYY-MM-DD HH:mm Z"));
  }

  // Run forrest run!
  updateCountdown();
</script>

##### HTML:
{% highlight html %}
<!-- Include MomentJS library -->
<script src="moment.js"></script>
<script src="moment-timezone-with-data.js"></script>

<div id="clock"></div>
{% endhighlight %}

##### JS:
{% highlight js %}
var nextYear = moment.tz("2015-01-01 00:00", "America/Sao_Paulo");

$('#clock').countdown(nextYear.toDate(), function(event) {
  $(this).html(event.strftime('%D days %H:%M:%S'));
});
{% endhighlight %}


## Feature read

- [MomentJS Documentation](http://momentjs.com/docs/)
- [Moment Timezone Documentation](http://momentjs.com/timezone/docs/)


## Why use MomentJS

The JavaScript `Date` object has support for timezones, but by default are **naive** – does not have any information about the timezone – and are localized according to where is run:

> The JavaScript Date object supports a number of UTC (universal) methods, as well as local time methods. UTC, also known as Greenwich Mean Time (GMT), refers to the time as set by the World Time Standard. **The local time is the time known to the computer where JavaScript is executed.**
>
> – From: [Mozilla Developer Network](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date)

[MomentJS](http://momentjs.com/) is a great piece of open-source project, is stable, well maintained and have a great support to manage and convert the timezone aware `Date` objects. Is good to remember that it's a best practice to always store and retreive dates from the server in the UTC.

From the beginning, this project aimed to create an easy to use and customizable **countdown** plugin, people often have a hard time do disassociate the timezone problem from the former because they look the same but they are not.

Keep in mind that this project will NEVER support a timezone aware version out-of-the box.
