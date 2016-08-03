---
layout: content
title:  Basic coupon site
category: examples
---
This is the most common case to use the script, that mimic the countdown style in coupon sites like **Groupon**. Format the output with `%D days %H:%M:%S`.

<div class="example-base">
  Limited Time Only!
  <span id="clock"></span>
</div>

<script type="text/javascript">
  // 15 days from now!
  var date = new Date(new Date().valueOf() + 15 * 24 * 60 * 60 * 1000);
  $('#clock').countdown(date, function(event) {
    $(this).html(event.strftime('%D days %H:%M:%S'));
  });
</script>

##### HTML:
{% highlight html %}
<span id="clock"></span>
{% endhighlight %}

##### JS:
{% highlight js %}
$('#clock').countdown('2020/10/10', function(event) {
  $(this).html(event.strftime('%D days %H:%M:%S'));
});
{% endhighlight %}
