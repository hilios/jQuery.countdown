---
layout: content
title:  Advanced coupon site
toc:    links
---

This example handle multiple cases of the countdown, like hiding weeks and days when they are not needed, handling pluralization and the finish event.

{% highlight js linenos %}
$('#clock').countdown('2020/10/10')
    .on('update.countdown', function(event) {
        var format = '%H:%M:%S';
        if(event.offset.days > 0) {
            format = '%-d days ' + format;
        }
        if(event.offset.weeks > 0) {
            format = '%-w weeks ' + format;
        }
        $(this).html(event.strftime());
    )
    .on('finish.countdown', function(event) {
        $(this).html('This offer has expired');
    });
{% endhighlight %}