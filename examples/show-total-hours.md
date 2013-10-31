---
layout: content
title:  Sum of total hours remaining
category: examples
position: 5
---
Display a countdown calculating all remining hours to the final date.

<div id="clock" class="total-hours"></div>

<script type="text/javascript">
    twoDaysFromNow = new Date().valueOf() + 2 * 24 * 60 * 60 * 1000;
    $('#clock').countdown(twoDaysFromNow, function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
        $(this).html(event.strftime(totalHours + 'hr %Mmin %Ssec'));
    });
</script>

##### HTML:
{% highlight html linenos %}
<div id="clock"></div>
{% endhighlight %}

##### Javascript:
{% highlight js linenos %}
    $('#clock').countdown("2020/10/10", function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
        $(this).html(event.strftime(totalHours + 'hr %Mmin %Ssec'));
    });
{% endhighlight %}