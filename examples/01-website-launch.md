---
layout: content
title:  Website launch (callback style)
category: examples
---

This one is very similar to the legacy example, but uses the callback style instead. Format the output with blank-padded values for weeks (`%-w`) and days (`%-d`).

<div class="launch-time">
    This plugin will be available in ...
    <div id="launch-time"></div>
</div>

<script type="text/javascript">
    var sixMonths = new Date(new Date().valueOf() + 6 * 30 * 24 * 60 * 60 * 1000);

    $('#launch-time').countdown(sixMonths).on('update.countdown', function(event) {
    var $this = $(this).html(event.strftime(''
        + '<span>%-w</span> weeks '
        + '<span>%-d</span> days '
        + '<span>%H</span> hr '
        + '<span>%M</span> min '
        + '<span>%S</span> sec'));
    });
</script>

##### HTML:
{% highlight html linenos %}
<div id="launch-time"></div>
{% endhighlight %}

##### Javascript:
{% highlight js linenos %}
$('#launch-time').countdown('2020/10/10').on('update.countdown', function(event) {
    var $this = $(this).html(event.strftime(''
        + '<span>%-w</span> weeks '
        + '<span>%-d</span> days '
        + '<span>%H</span> hr '
        + '<span>%M</span> min '
        + '<span>%S</span> sec'));
});
{% endhighlight %}