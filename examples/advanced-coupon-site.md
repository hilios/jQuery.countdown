---
layout: content
title:  Advanced coupon site
category: examples
---
This example handle multiple cases of the countdown, show `%-w` weeks and `%-d` days only when necessary and handle pluralization, display the time as `%H:%M:%S`.

<div class="example-base">
  Limited Time Only!
  <span id="clock"></span>
</div>

<div class="example-selector">
  <select id="time-selector">
    <option value="5w" selected>5 weeks from now</option>
    <option value="1.1w">1 week from now (pluralization in action)</option>
    <option value="5d">5 days from now</option>
    <option value="1.1d">1 day from now (pluralization in action)</option>
    <option value="5h">5 hours from now</option>
    <option value="5s">5 seconds from now (finishin in ...)</option>
  </select>
  <small>Change the value on the drop down to see the changes.</small>
</div>

<script type="text/javascript">
  var $clock = $('#clock')
    .on('update.countdown', function(event) {
      var format = '%H:%M:%S';
      if(event.offset.totalDays > 0) {
        format = '%-d day%!d ' + format;
      }
      if(event.offset.weeks > 0) {
        format = '%-w week%!w ' + format;
      }
      $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function(event) {
      $(this).parent()
        .addClass('disabled')
        .html('This offer has expired!');
    });

  $('#time-selector').on('change', function() {
    var val = $(this).val().toString().match(/^([0-9\.]{1,})([a-z]{1})$/),
        qnt = parseFloat(val[1]),
        mod = val[2];
    switch(mod) {
      case 's':
        val = qnt * 1000;
        break;
      case 'h':
        val = qnt * 60 * 60 * 1000;
        break;
      case 'd':
        val = qnt * 24 * 60 * 60 * 1000;
        break;
      case 'w':
        val = qnt * 7 * 24 * 60 * 60 * 1000;
        break; // Break here to no enter the else value
      default:
        val = 0;
    }
    selectedDate = new Date().valueOf() + val;
    $clock.countdown(selectedDate.toString());
  }).trigger('change');
</script>

##### HTML:
{% highlight html %}
<div class="countdown">
  Limited Time Only!
  <span id="clock"></span>
</div>
{% endhighlight %}

##### JS:
{% highlight js %}
$('#clock').countdown('2020/10/10 12:34:56')
.on('update.countdown', function(event) {
  var format = '%H:%M:%S';
  if(event.offset.totalDays > 0) {
    format = '%-d day%!d ' + format;
  }
  if(event.offset.weeks > 0) {
    format = '%-w week%!w ' + format;
  }
  $(this).html(event.strftime(format));
})
.on('finish.countdown', function(event) {
  $(this).html('This offer has expired!')
    .parent().addClass('disabled');

});
{% endhighlight %}
