---
layout: content
title:  Callback style and formatter modifiers
category: examples
position: 2
---
Very similar to the legacy example, but uses the callback style instead. Format the output with blank-padded value for weeks (`%-w`) and days (`%-d`) and pluralize it's output with `%!w` and `%!d`.

<div class="big-countdown">
    This plugin will be available in ...
    <div id="clock"></div>
</div>

<script type="text/javascript">
    var sixMonths = new Date(new Date().valueOf() + 6 * 30 * 24 * 60 * 60 * 1000);

    $('#clock').countdown(sixMonths).on('update.countdown', function(event) {
    var $this = $(this).html(event.strftime(''
        + '<span>%-w</span> week%!w '
        + '<span>%-d</span> day%!d '
        + '<span>%H</span> hr '
        + '<span>%M</span> min '
        + '<span>%S</span> sec'));
    });
</script>

##### HTML:
{% highlight html linenos %}
<div id="clock"></div>
{% endhighlight %}

##### Javascript:
{% highlight js linenos %}
$('#clock').countdown('2020/10/10').on('update.countdown', function(event) {
    var $this = $(this).html(event.strftime(''
        + '<span>%-w</span> week%!w '
        + '<span>%-d</span> day%!d '
        + '<span>%H</span> hr '
        + '<span>%M</span> min '
        + '<span>%S</span> sec'));
});
{% endhighlight %}