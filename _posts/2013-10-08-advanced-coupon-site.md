---
layout: content
title:  Advanced coupon site
toc:    links
---

This example handle multiple cases of the countdown, like hiding weeks and days when they are not needed, handling pluralization and the finish event.

To see in action change the value on the drop down bellow.

<div class="advanced-coupon">
    <select id="time-selector" class="form-control">
        <option value="5w" selected>5 weeks from now</option>
        <option value="5d">5 days from now</option>
        <option value="5h">5 hours from now</option>
        <option value="5s">5 seconds from now</option>
    </select>
    <div class="advanced-coupon-display">
        Limited Time Only!
        <span id="clock"></span>
    </div>
</div>

<script type="text/javascript">
    var $clock = $('#clock')
        .on('update.countdown', function(event) {
            var format = '%H:%M:%S';
            if(event.offset.days > 0) {
                format = '%-d days ' + format;
            }
            if(event.offset.weeks > 0) {
                format = '%-w weeks ' + format;
            }
            $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function(event) {
            $(this).parent()
                .addClass('disabled')
                .html('<strong>This offer has ended!</strong>');
        });

    $('#time-selector').on('change', function() {
        var val = $(this).val().toString().match(/^([0-9]{1,})([a-z]{1})$/),
            qnt = parseInt(val[1]),
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
        if($clock) {
            try {
                $clock.countdown('remove');    
            } catch(e) {
                // Countdown wasn't created
            }
        }
        $clock.countdown(selectedDate);

    }).trigger('change');
</script>

{% highlight js linenos %}
$('#clock').countdown('2020/10/10 12:34:56')
    .on('update.countdown', function(event) {
        var format = '%H:%M:%S';
        if(event.offset.days > 0) {
            format = '%-d days ' + format;
        }
        if(event.offset.weeks > 0) {
            format = '%-w weeks ' + format;
        }
        $(this).html(event.strftime());
    })
    .on('finish.countdown', function(event) {
        $(this).parent().addClass('disabled').html('<strong>This offer has ended!</strong>');
    });
{% endhighlight %}