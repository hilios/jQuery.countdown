---
layout: content
title:  Multiple instances on the same page
category: examples
---

<div class="row multiple-instance">
    <div class="col-md-3">
        <div class="clock">1</div>
    </div>
    <div class="col-md-3">
        <div class="clock">2</div>
    </div>
    <div class="col-md-3">
        <div class="clock">3</div>
    </div>
    <div class="col-md-3">
        <div class="clock">4</div>
    </div>
</div>

<script type="text/javascript">
    $('.clock').each(function() {
        $(this).countdown('2020/01/01', function(event) {
            $(this).html(event.strftime('%D days %H:%M:%S'));
        });
    });
</script>

##### HTML:
{% highlight html linenos %}
<div class="clock"></div>
<div class="clock"></div>
<div class="clock"></div>
<div class="clock"></div>
{% endhighlight %}

##### Javascript:
{% highlight js linenos %}

{% endhighlight %}