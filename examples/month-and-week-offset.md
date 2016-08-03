---
layout: content
title:  Months and weeks offsets
category: examples
---
Display the possibles days offsets `%n`, `%d` and `%D` regarging the months, weeks and the total amount of the days until the finish date.

<div id="example-wrapper">
  <div class="example-blocks">
    New year's eve in weeks:
    <div id="clock1"></div>
  </div>
  <div class="example-blocks">
    New year's eve in months:
    <div id="clock2"></div>
  </div>
  <div class="example-blocks">
    New year's eve in days:
    <div id="clock3"></div>
  </div>
</div>

<script type="text/javascript">
  var nextYear = new Date(new Date().getFullYear() + 1, 0, 0, 0, 0, 0, 0);
  $('#example-wrapper').countdown(nextYear, function(event) {
    $('#clock1').html(event.strftime('<span>%w weeks and %d days</span>'));
    $('#clock2').html(event.strftime('<span>%m months and %n days</span>'));
    $('#clock3').html(event.strftime('<span>%D days</span>'));
  });
</script>

##### HTML:
{% highlight html %}
<div id="wrapper">
  <div id="clock-a"></div>
  <div id="clock-b"></div>
  <div id="clock-c"></div>
</div>
{% endhighlight %}

##### JS:
{% highlight js %}
$('#wrapper').countdown('2020/10/10', function(event) {
  $('#clock-a').html(event.strftime('%w weeks and %d days'));
  $('#clock-b').html(event.strftime('%m months and %n days'));
  $('#clock-c').html(event.strftime('%D days'));
});
{% endhighlight %}
