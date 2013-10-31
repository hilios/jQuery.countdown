---
layout: content
title:  Multiple instances on the same page
category: examples
---
Assign the countdown on several elements at the same time.

<div class="row multiple-instance">
    <div class="col-md-3">
        <div class="clock" data-countdown="2020/01/01">&nbsp;</div>
    </div>
    <div class="col-md-3">
        <div class="clock" data-countdown="2019/01/01">&nbsp;</div>
    </div>
    <div class="col-md-3">
        <div class="clock" data-countdown="2018/01/01">&nbsp;</div>
    </div>
    <div class="col-md-3">
        <div class="clock" data-countdown="2017/01/01">&nbsp;</div>
    </div>
</div>

<script type="text/javascript">
    $('[data-countdown]').each(function() {
        var $this = $(this), 
            finalDate = new Date().valueOf() 
                + parseInt(Math.random() * 150) * 24 * 60 * 60 * 1000;
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('%D days %H:%M:%S'));
        });
    });
</script>

##### HTML:
{% highlight html linenos %}
<div data-countdown="2020/01/01"></div>
<div data-countdown="2019/01/01"></div>
<div data-countdown="2018/01/01"></div>
<div data-countdown="2017/01/01"></div>
{% endhighlight %}

##### Javascript:
{% highlight js linenos %}
$('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
        $this.html(event.strftime('%D days %H:%M:%S'));
    });
});
{% endhighlight %}