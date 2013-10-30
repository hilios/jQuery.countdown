---
layout: content
title:  Basic coupon site
toc:    links
---

This is the most common case to use the script, that mimic the countdown style in coupon sites like [Groupon](http://www.groupon.com/browse/miami). 

Just use the formatter with `%D days %H:%M:%S`.


<div class="basic-coupon">
    Limited Time Only!
    <span id="clock"></span>
</div>

<script type="text/javascript">
    // 10 days from now!
    var date = new Date(new Date().valueOf() + 15 * 24 * 60 * 60 * 1000);

    $('#clock').countdown(date, function(event) {
        $(this).html(event.strftime('%D days %H:%M:%S'));
    });
</script>

{% highlight html linenos %}
<span id="clock"></span>
{% endhighlight %}

{% highlight js linenos %}
$('#clock').countdown('2020/10/10', function(event) {
    $(this).html(event.strftime('%D days %H:%M:%S'));
});
{% endhighlight %}