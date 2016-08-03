---
layout: content
title:  Multiple instances on the same page
category: examples
---
Assign the countdown on several elements at the same time.

<div class="pure-g-r">
  <div class="pure-u-1-4">
    <div class="example-multiple" data-countdown="true">&nbsp;</div>
  </div>
  <div class="pure-u-1-4">
    <div class="example-multiple" data-countdown="true">&nbsp;</div>
  </div>
  <div class="pure-u-1-4">
    <div class="example-multiple" data-countdown="true">&nbsp;</div>
  </div>
  <div class="pure-u-1-4">
    <div class="example-multiple" data-countdown="true">&nbsp;</div>
  </div>
</div>

<script type="text/javascript">
  var currentYear = new Date().getFullYear(),
    i = 2;
  $('[data-countdown]').each(function() {
    var $this = $(this),
        finalDate = String(currentYear + i++) + '/01/01';

    $this.countdown(finalDate, function(event) {
      $this.html(event.strftime('%D days %H:%M:%S'));
    });
  });
</script>

##### HTML:
{% highlight html %}
<div data-countdown="2016/01/01"></div>
<div data-countdown="2017/01/01"></div>
<div data-countdown="2018/01/01"></div>
<div data-countdown="2019/01/01"></div>
{% endhighlight %}

##### JS:
{% highlight js %}
$('[data-countdown]').each(function() {
  var $this = $(this), finalDate = $(this).data('countdown');
  $this.countdown(finalDate, function(event) {
    $this.html(event.strftime('%D days %H:%M:%S'));
  });
});
{% endhighlight %}
