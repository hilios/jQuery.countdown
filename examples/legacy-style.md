---
layout: content
title:  Legacy style
category: examples
---
Assign the callback uppon initialization, format the countdown `%w` weeks `%d` days `%H` hours `%M` minutes `%S` seconds where each directive value is displayed within his own DOM element (`<span>`) and all are zero-padded.

<div class="example-blocks">
  New year's eve in
  <div id="clock"></div>
</div>

<script type="text/javascript">
  var nextYear = new Date(new Date().getFullYear() + 1, 0, 0, 0, 0, 0, 0);
  $('#clock').countdown(nextYear, function(event) {
    var $this = $(this).html(event.strftime(''
      + '<span>%w</span> weeks '
      + '<span>%d</span> days '
      + '<span>%H</span> hr '
      + '<span>%M</span> min '
      + '<span>%S</span> sec'));
  });
</script>

##### HTML:
{% highlight html %}
<div id="clock"></div>
{% endhighlight %}

##### JS:
{% highlight js %}
$('#clock').countdown('2020/10/10', function(event) {
  var $this = $(this).html(event.strftime(''
    + '<span>%w</span> weeks '
    + '<span>%d</span> days '
    + '<span>%H</span> hr '
    + '<span>%M</span> min '
    + '<span>%S</span> sec'));
});
{% endhighlight %}
