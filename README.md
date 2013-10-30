The Final Countdown
===================

#### A simple and html agnostic date countdown plugin for jQuery ####

To get started, check-it out: http://hilios.github.io/jQuery.countdown/

The ultimate countdown plugin designed to fit in any coupon and auction site. Read our [Documentation](http://hilios.github.io/jQuery.countdown/documentation.html) and follow our [Examples](http://hilios.github.io/jQuery.countdown/examples.html) to see what suits your particular needs.

#### Requirements ####

Since version >= 2.0.0 we only support jQuery up to version 1.7, for legacy 1.6 support please use the v1.0.1 branch.

Getting started
---------------

[![Getting started screenshot](http://hilios.github.io/jQuery.countdown/images/getting-started-screenshot.png)](http://hilios.github.io/jQuery.countdown/)

```html
<div id="countdown">
  Next year in
  <span class="weeks"></span>   weeks
  <span class="days"></span>    days
  <span class="hours"></span>   hours
  <span class="minutes"></span> minutes
  <span class="seconds"></span> seconds
</div>
<script type="text/javascript">
  $('#countdown').countdown("{{ site.time | date: '%Y' | plus:1 }}/01/01", function(event) {
    var $this = $(this);
    for(var key in event.offset) {
      if(event.offset.hasOwnProperty(key)) {
        $this.find('.' + key).html(event.strftime('%' + key));
      }
    }
  });
</script>
```

### [Documentation](http://hilios.github.io/jQuery.countdown/documentation.html)

Our documentation is powered by [Jekyll](http://jekyllrb.com/) (see `gh-page` branch) and hosted in GitHub Pages at [http://hilios.github.io/jQuery.countdown/](http://hilios.github.io/jQuery.countdown/documentation.html).

### [Examples](http://hilios.github.io/jQuery.countdown/examples.html)

There are few ways to get started, from the most simple example to the advanced, we support many different countdown styles, see wich one fits your scenario, and if anyone doesn't it's a good starting point to customize the script.

-   [Coupon site with format hr:min:sec](#)
-   [Coupon site with format N days hr:min:sec](#)
-   [Coupon site with format N days hr:min:sec](#)
-   [Groupon Getaways](#)
-   [Multiple countdown on the same page](#)
-   [Website launch](#)

Contributing
------------

The Final Countdown uses **Grunt** with convenient methods for working with the plugin. It's how we compile our code and run tests. To use it, get [NodeJS](http://nodejs.org/), install the required dependencies as directed and then run some Grunt commands.

```shell
npm install
grunt test  # Lint code and run unit test
grunt build # Generate the min version
grunt       # Watch for updates than test and build
```

This plugin is tested with [QUnit](http://qunitjs.com/), under jQuery 1.7.2 up to 2.0.3, Bootstrap 3.0 and RequireJS 2.1.9. 

The functional tests were made against:

*   Chrome >= 12
*   Safari >= 5
*   Firefox >= 5.0
*   IE 7/8/9

### Contributors ###

Thanks for bug reporting and fixes:

*   Daniel Leavitt (@dleavitt)
*   Fagner Brack (@FagnerMartinsBrack)
*   Matthew Sigley (@msigley)

### License ###

Copyright (c) 20011 Edson Hilios. This is a free software is licensed under the MIT License.

*   [Edson Hilios](http://edson.hilios.com.br). Mail me: edson (at) hilios (dot) com (dot) br