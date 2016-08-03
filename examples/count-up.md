---
layout: content
title:  Continue after finish
category: examples
---
Configure countdown to continue after reaches its end, then the timer will start to counting up and will never stop until said so.

<div class="example-blocks">
  <div id="clock"></div>
</div>

<script type="text/javascript">
  var fiveSeconds = new Date().getTime() + 5000;

  $('#clock').countdown(fiveSeconds, {elapse: true}).on('update.countdown', function(event) {
    var $this = $(this);
    if (event.elapsed) {
      $this.html(event.strftime('After end:<br>'
        + '<span>%H:%M:%S</span>'));
    } else {
      $this.html(event.strftime('To end:<br>'
        + '<span>%H:%M:%S</span>'));
    }
  });
</script>

##### HTML:
{% highlight html %}
<div id="clock"></div>
{% endhighlight %}

##### JS:
{% highlight js %}
var fiveSeconds = new Date().getTime() + 5000;
$('#clock').countdown(fiveSeconds, {elapse: true})
.on('update.countdown', function(event) {
  var $this = $(this);
  if (event.elapsed) {
    $this.html(event.strftime('After end: <span>%H:%M:%S</span>'));
  } else {
    $this.html(event.strftime('To end: <span>%H:%M:%S</span>'));
  }
});
{% endhighlight %}
