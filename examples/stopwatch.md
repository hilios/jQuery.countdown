---
layout: content
title:  Stopwatch
category: examples
---
Pause and continues the countdown from the same point.

<div class="example-base">
  <span id="clock"></span>

  <button class="pure-button pure-button-primary">Pause / Continues</button>
</div>

<script type="text/javascript">
  var twoDaysFromNow = new Date().valueOf() + 2 * 24 * 60 * 60 * 1000;
  $('#clock').countdown(twoDaysFromNow, function(event) {
    var totalHours = event.offset.totalDays * 24 + event.offset.hours;
    $(this).html(event.strftime(totalHours + ' hr %M min %S sec'));
  });
</script>

##### HTML:
{% highlight html %}
<div id="clock"></div>
{% endhighlight %}

##### JS:
{% highlight js %}
$('#clock').countdown("2020/10/10", function(event) {
  var totalHours = event.offset.totalDays * 24 + event.offset.hours;
  $(this).html(event.strftime(totalHours + ' hr %M min %S sec'));
});
{% endhighlight %}
